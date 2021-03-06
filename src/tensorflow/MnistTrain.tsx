import { createRef, PureComponent } from 'react'
import * as tf from '@tensorflow/tfjs';
import { loadImageData, loadLabelData, IMAGE_SIZE, IMAGE_H, IMAGE_W, NUM_CLASSES } from './MnistData'
import * as G2 from '@antv/g2'
import { Button, message, InputNumber, Alert, Progress } from 'antd'
import './index.css'

export default class MnistTrain extends PureComponent {
  imageBoxRef = createRef<HTMLDivElement>()
  canvasRef = createRef<HTMLCanvasElement>()
  imageRef = createRef<HTMLImageElement>()

  lossChart: G2.Chart | null = null
  accuracyChart: G2.Chart | null = null

  model: tf.Sequential | null = null
  images: Uint8Array | null = null
  labels: Uint8Array | null = null

  trainBatchCount: number = 0
  state = {
    mnistDataPending: false,
    trainPending: false,
    trainEpoch: 1,
    valAcc: 0,
    valLoss: 0,
    trainProgress: 0,
    predictResult: null
  }

  componentDidMount() {
    this.initCanvas()
    this.renderChart()
  }

  loadMnistData = async () => {
    if (this.images && this.labels) {
      return message.warning('data is loaded!')
    }
    this.setState({ ...this.state, mnistDataPending: true })
    const result = await Promise.all([loadImageData(), loadLabelData()])
    this.images = result[0]
    this.labels = result[1]
    this.setState({ ...this.state, mnistDataPending: false })
    return message.success('loading done!')
  }

  train = async () => {
    if (!this.model) {
      return message.warning('Model is not created!')
    }
    if (!this.images || !this.labels) {
      return message.warning('Mnist data is not loaded!')
    }
    const epochs = this.state.trainEpoch
    this.setState({ ...this.state, trainPending: true })
    console.log('Training model...')
    const model = this.model
    const batchSize = 320
    //遗留15%的训练数据进行验证，以监控训练期间的过度拟合
    const validationSplit = 0.15
    const xs = tf.tensor4d(
      this.images,
      [this.images.length / IMAGE_SIZE, IMAGE_H, IMAGE_W, 1]
    )

    const ys = tf.tensor2d(
      this.labels, [this.labels.length / NUM_CLASSES, NUM_CLASSES]
    )
    //当前批次
    let trainBatchCount = 0
    //总批次
    const totalNumBatches = Math.ceil(xs.shape[0] * (1 - validationSplit) / batchSize) * epochs
    await model.fit(xs, ys, {
      batchSize,
      validationSplit,
      epochs: epochs,
      callbacks: {
        onBatchEnd: async (batch, logs: any) => {
          trainBatchCount++
          const trainProgress = ~~((trainBatchCount / totalNumBatches * 100) * 100) / 100
          this.setState({ trainProgress, valAcc: logs.acc, valLoss: logs.loss })
          this.updateChart(logs.loss, logs.acc)
          if (batch % 10 === 0) {
            this.testImagePredict()
          }
          await tf.nextFrame()
        },
        onEpochEnd: async (epoch, logs: any) => {
          console.log("Epoch: " + epoch + " Loss: " + logs.loss)
          this.setState({ valAcc: logs.val_acc, valLoss: logs.val_loss })
          await tf.nextFrame()
        },
        onTrainEnd: () => {
          console.log('Train done!')
          this.setState({ ...this.state, trainPending: false })
        }
      }
    })
  }

  createConvModel = () => {
    if (this.model) {
      return message.success('Model is created!')
    }
    const model = tf.sequential()
    model.add(tf.layers.conv2d({
      inputShape: [IMAGE_H, IMAGE_W, 1],
      kernelSize: 3,
      filters: 16,
      activation: 'relu'
    }))
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))
    model.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }))
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))
    model.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }))
    model.add(tf.layers.flatten({}))
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }))
    model.add(tf.layers.dense({ units: 10, activation: 'softmax' }))
    model.compile({ optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'] })
    model.summary()
    this.model = model
    message.success('Model create done!')
  }

  createDenseModel = () => {
    if (this.model) {
      return message.success('Model is created!')
    }
    const model = tf.sequential()
    model.add(tf.layers.flatten({ inputShape: [IMAGE_H, IMAGE_W, 1] }))
    model.add(tf.layers.dense({ units: 42, activation: 'relu' }))
    model.add(tf.layers.dense({ units: 10, activation: 'softmax' }))
    model.compile({ optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'] })
    model.summary()
    this.model = model
    message.success('Model create done!')
  }

  /**
   * 测试预测图片结果
   */
  testImagePredict = () => {
    if (!this.images || !this.labels || !this.model) return
    //获取图片总张数
    // console.log('Img total is ' + this.images.length / 784)
    //渲染范围 0 ~ 100 总的范围 0 ~ (this.images.length / 784)
    const range = [100, 200]
    const count = range[1] - range[0]
    //截取图片
    const images = this.images.slice(IMAGE_SIZE * range[0], range[1] * IMAGE_SIZE)
    const labels = this.labels.slice(NUM_CLASSES * range[0], range[1] * NUM_CLASSES)

    // tensor4d ->  [n 28 28 1]
    const xs = tf.tensor4d(images, [images.length / IMAGE_SIZE, IMAGE_H, IMAGE_W, 1])

    //获取真实结果
    const reals = labels.reduce<number[]>((cur, item, i) => item ? [...cur, i % 10] : cur, [])
    //预测结果
    const output = this.model.predict(xs) as tf.Tensor2D
    const predictions = Array.from(output.argMax(1).dataSync())
    //必须显式的销毁
    xs.dispose()
    output.dispose()
    this.renderCanvas(images, count, predictions, reals)
  }

  renderCanvas(images: Uint8Array, count: number, predictions: number[], reals: number[]) {
    const imageBox = this.imageBoxRef.current!
    imageBox.innerHTML = ''
    for (let i = 0; i < count; i++) {
      const image = images.slice(i * 784, i * 784 + 784)
      const prediction = predictions[i]
      const real = reals[i]
      const div = document.createElement('div')
      div.className = 'pred-container'
      const canvas = document.createElement('canvas')
      canvas.className = 'prediction-canvas'
      const [width, height] = [28, 28]
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      const imageData = new ImageData(width, height)
      /**
       * ImageData.prototype.Uint8ClampedArray: Uint8ClampedArray
       * 是一个8位无符号整型数组，8个二进制位有256种变化
       * 所以能存储的十进制数就是0 ~ 255
       * 
       * 一张图片是 28X28，那么它就有 28X28 个像素点
       * 每一个像素点需要四个数据来表示 =  R红 G绿 B蓝 A色彩空间
       * 
       * 那么我们就需要 28 x 28 x 4 个字节来存储这张图片
       * 也就是new ImageData(28, 28)自动创建的内存空间大小
       */
      for (let i = 0; i < height * width; i++) {
        const j = i * 4
        imageData.data[j + 0] = image[i]
        imageData.data[j + 1] = image[i]
        imageData.data[j + 2] = image[i]
        imageData.data[j + 3] = 255
      }
      ctx.putImageData(imageData, 0, 0)
      const pred = document.createElement('div')
      const correct = prediction === real
      pred.className = correct ? 'pred-correct' : 'pred-incorrect'
      pred.innerText = `预测: ${prediction}`
      div.appendChild(pred)
      div.appendChild(canvas)
      imageBox.appendChild(div)
    }
  }

  predict = () => {
    const canvasImg = this.imageRef.current!
    const drawCtx = this.canvasRef.current!.getContext('2d')!
    if (!this.model) {
      return message.warning('Model is not created!')
    }

    //只要红色通道
    const image3d = tf.browser.fromPixels(canvasImg, 1)
    const resize = tf.image.resizeBilinear(image3d, [28, 28])
    const image4d = resize.as4D(1, 28, 28, 1)

    const prediction = this.model.predict(image4d) as tf.Tensor2D
    const maxIndex = tf.argMax(prediction, 1).dataSync()
    this.setState({ ...this.state, predictResult: maxIndex[0] })
    drawCtx.fillRect(0, 0, 280, 280)
  }

  initCanvas = () => {
    const canvas = this.canvasRef.current!
    const image = this.imageRef.current!
    canvas.width = 280
    canvas.height = 280
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, 280, 280)
    let moused = false
    canvas.addEventListener('mousedown', (e) => {
      moused = true
    })
    canvas.addEventListener('mouseup', (e) => {
      moused = false
      image.src = canvas.toDataURL('image/png')
    })
    canvas.addEventListener('mousemove', (e) => {
      if (!moused) return
      ctx.beginPath()
      ctx.lineWidth = 32
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'white'
      ctx.moveTo(e.offsetX, e.offsetY)
      ctx.lineTo(e.offsetX, e.offsetY)
      ctx.stroke()
    })
  }

  updateChart = (loss: number, acc: number) => {
    if (!this.lossChart || !this.accuracyChart) return
    const batch = this.trainBatchCount++
    const lossData = [
      ...this.lossChart.getData(), { batch, loss }
    ]
    this.lossChart.changeData(lossData)
    const accuracyData = [
      ...this.accuracyChart.getData(), { batch, acc }
    ]
    this.accuracyChart.changeData(accuracyData)
  }

  renderChart = () => {
    const lossData: { batch: number, loss: number }[] = [
      // { batch: 0, loss: 1 }, { batch: 1, loss: 2 }, { batch: 2, loss: 1 }
    ]
    const lossChart = new G2.Chart({
      container: 'lossChart',
      autoFit: true,
      height: 300,
      padding: 50
    })
    lossChart.data(lossData)
    lossChart.line().position('batch*loss')
    lossChart.point().position('batch*loss').size(4).shape('circle').style({
      stroke: '#fff',
      lineWidth: 1
    })
    lossChart.scale('loss', {
      alias: 'LOSS'
    })
    lossChart.axis('loss', {
      title: { style: { fontSize: 16, fill: '#aaaaaa' } }
    })
    lossChart.scale('batch', {
      alias: 'BATCH'
    })
    lossChart.axis('batch', {
      title: { style: { fontSize: 16, fill: '#aaaaaa' } }
    })
    lossChart.render()
    this.lossChart = lossChart

    const accuracyChart = new G2.Chart({
      container: 'accuracyChart',
      autoFit: true,
      height: 300,
      padding: 50
    })
    const accuracyData: { batch: number, acc: number }[] = [
      // { batch: 0, acc: 1 }, { batch: 1, acc: 2 }, { batch: 2, acc: 1 }
    ]
    accuracyChart.data(accuracyData)
    accuracyChart.line().position('batch*acc').style({
      stroke: '#facc15'
    })
    accuracyChart.point().position('batch*acc').size(4).shape('circle').style({
      stroke: 'white',
      lineWidth: 1,
      fill: '#facc15'
    })
    accuracyChart.scale('acc', {
      alias: 'ACCURACY'
    })
    accuracyChart.axis('acc', {
      title: { style: { fontSize: 16, fill: '#aaaaaa' } }
    })
    accuracyChart.scale('batch', {
      alias: 'BATCH'
    })
    accuracyChart.axis('batch', {
      title: { style: { fontSize: 16, fill: '#aaaaaa' } }
    })
    accuracyChart.render()
    this.accuracyChart = accuracyChart
  }

  render() {
    return (
      <div className="tf">
        <div className="ftitle">
          TRAINING PARAMETERS
        </div>
        <div className="bt">
          <Button
            loading={this.state.mnistDataPending}
            type="primary" size="large"
            onClick={this.loadMnistData}
          >LOAD DATA</Button>
          <Button
            onClick={this.createConvModel}
            type="primary"
            size="large"
          >CREATE MODEL</Button>
          <Button
            onClick={this.train}
            size="large"
            danger
            loading={this.state.trainPending}
          >TRAIN MODEL</Button>
          <span style={{ marginLeft: '10px' }}>EPOCHS</span>
          <InputNumber
            style={{ marginLeft: '10px' }}
            min={1} max={3}
            defaultValue={1}
            size="large"
            onChange={(e) => {
              if (typeof e === 'number') {
                this.setState({ ...this.state, trainEpoch: e })
              }
            }}
          />
        </div>
        <div className="ftitle">
          TRAINING PROGRESS
        </div>
        <div>
          {this.state.valAcc ? <Alert
            message={`精度：${this.state.valAcc}，误差：${this.state.valLoss}`}
            type="success"
          /> : null}
          <Progress percent={this.state.trainProgress} steps={30} strokeColor="#52c41a" />
        </div>
        <div id="lossChart"></div>
        <div id="accuracyChart"></div>
        <div className="ftitle">
          INFERENCE EXAMPLES
        </div>
        <div ref={this.imageBoxRef} className="pred"></div>
        <div className="ftitle">
          TEST MODEL
        </div>
        <div className="bt">
          <Button size="large" type="primary" onClick={this.predict}>PREDICT</Button>
        </div>
        <div className="draw">
          <canvas ref={this.canvasRef}></canvas>
          <img alt="" ref={this.imageRef} style={{ width: 280, height: 280, marginLeft: '2px' }} />
          <span style={{ fontSize: '80px', marginLeft: '30px', fontWeight: 600 }}>{this.state.predictResult}</span>
        </div>
      </div>
    )
  }
}