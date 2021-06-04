import { createRef, PureComponent } from "react";
import * as tf from '@tensorflow/tfjs'
import { Button, Divider } from "antd";

enum SHAPE { Rock, Paper, Scissors }

export default class ImageClassify extends PureComponent {
  videoRef = createRef<HTMLVideoElement>()
  canvasRef = createRef<HTMLCanvasElement>()
  xs: tf.Tensor4D | null = null
  ys: tf.Tensor2D | null = null
  model: tf.Sequential | null = null
  mobilenet: tf.LayersModel | null = null
  state = {
    rock: 0,
    paper: 0,
    scissors: 0
  }
  updateCount = (sha: SHAPE) => {
    switch (sha) {
      case 0:
        return this.setState({ ...this.state, rock: this.state.rock + 1 })
      case 1:
        return this.setState({ ...this.state, paper: this.state.paper + 1 })
      case 2:
        return this.setState({ ...this.state, scissors: this.state.scissors + 1 })
    }
  }
  componentDidMount() {
    this.loadMobilenet()
  }
  async downloadMobilenet() {
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
    const layer = mobilenet.getLayer('conv_pw_13_relu')
    const model = tf.model({ inputs: mobilenet.inputs, outputs: layer.output })
    await model.save('downloads://mobilenet')
  }
  async loadMobilenet() {
    this.mobilenet = await tf.loadLayersModel('/model/mobilenet.json')
    this.mobilenet.summary()
    //预热模型，让第一个预测更快。
    const prediction = this.mobilenet.predict(tf.zeros([1, 224, 224, 3])) as tf.Tensor
    prediction.dispose()
    console.log('mobilenet load successing')
  }
  createModel = () => {
    const model = tf.sequential()
    model.add(tf.layers.flatten({ inputShape: [7, 7, 256] }))
    model.add(tf.layers.dense({ units: 100, activation: 'relu' }))
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }))
    // learning rate
    const optimizer = tf.train.adam(0.0001)
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' })
    model.summary()
    this.model = model
  }
  onOpenCameraClick = () => {
    const video = this.videoRef.current!
    const { width, height } = video
    navigator.mediaDevices.getUserMedia({
      video: { width, height }
    }).then(mediaStream => {
      video.srcObject = mediaStream
    }).catch(err => {
      console.log(err)
    })
  }
  onTrain = () => {
    if (!this.xs || !this.ys || !this.model) return
    const batchSize = ~~(this.xs.shape[0] * 0.4)
    this.model.fit(this.xs, this.ys, {
      batchSize,
      epochs: 20,
      callbacks: {
        onEpochEnd: (epoch, logs: any) => {
          console.log("Epoch: " + epoch + " Loss: " + logs.loss)
        }
      }
    })
  }
  onPredict = () => {
    if (!this.model || !this.mobilenet) return
    const video = this.videoRef.current!
    const image3d = tf.browser.fromPixels(video)
    //280 280 3 -> 224 224 3
    const resized = tf.image.resizeBilinear(image3d, [224, 224])
    const xs = resized.as4D(1, 224, 224, 3)
    const mxs = this.mobilenet.predict(xs) as tf.Tensor4D
    const prediction = this.model.predict(mxs) as tf.Tensor
    
    let n = prediction.argMax(1).dataSync()[0]
    console.log(SHAPE[n])
  }
  keepXs = (cxs: tf.Tensor4D) => {
    if (this.xs) {
      const oldXs = this.xs
      this.xs = tf.keep(oldXs.concat(cxs, 0))
      oldXs.dispose()
    } else {
      this.xs = tf.keep(cxs)
    }
    console.log(this.xs)
  }
  keepYs = (cys: tf.Tensor2D) => {
    if (this.ys) {
      const oldYs = this.ys
      this.ys = tf.keep(oldYs.concat(cys, 0))
      oldYs.dispose()
    } else {
      this.ys = tf.keep(cys)
    }
    console.log(this.ys)
  }
  onKeepClick = (sha: SHAPE) => {
    if (!this.mobilenet) return
    const video = this.videoRef.current!
    const canvas = this.canvasRef.current!
    const [width, height] = [280, 280]
    canvas.width = width
    canvas.height = height
    const image3d = tf.browser.fromPixels(video)
    //280 280 3 -> 224 224 3
    const resized = tf.image.resizeBilinear(image3d, [224, 224])

    const ysd = new Array(3).fill(0).fill(1, sha, sha + 1)
    const cys = tf.tensor2d(ysd, [1, 3])
    const cxs = resized.as4D(1, 224, 224, 3)

    //input-> 1 224 224 3, output-> 1 7 7 256
    const mxs = this.mobilenet.predict(cxs) as tf.Tensor4D
    this.keepYs(cys)
    this.keepXs(mxs)
    this.updateCount(sha)

    //预览图片
    const image = image3d.dataSync()
    const ctx = canvas.getContext('2d')!
    const imageData = new ImageData(width, height)
    for (let i = 0; i < width * height; i++) {
      const j = i * 4
      const k = i * 3
      imageData.data[j + 0] = image[k]
      imageData.data[j + 1] = image[k]
      imageData.data[j + 2] = image[k]
      imageData.data[j + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
  }
  render() {
    return (
      <div style={{ padding: '20px', display: 'flex' }}>
        <video
          ref={this.videoRef}
          controls autoPlay
          width={280}
          height={280}
          style={{ marginRight: '10px' }}
        />
        <canvas ref={this.canvasRef}
          style={{ width: 280, height: 280, border: '1px solid', marginRight: '10px' }}
        />
        <div>
          <Button size="large" onClick={this.onOpenCameraClick}>OPEN CAMERA</Button>
          <Button size="large" onClick={this.createModel}>CREATE MODEL</Button>
          <Divider />
          <Button size="large" onClick={() => this.onKeepClick(SHAPE.Rock)}>Rock</Button>
          <Button size="large" onClick={() => this.onKeepClick(SHAPE.Paper)}>Paper</Button>
          <Button size="large" onClick={() => this.onKeepClick(SHAPE.Scissors)}>Scissors</Button>
          <h2>Rock: {this.state.rock}, Paper: {this.state.paper}, Scissors: {this.state.scissors}</h2>
          <Divider />
          <Button size="large" onClick={this.onTrain}>TRAIN</Button>
          <Button size="large" onClick={this.onPredict}>PREDICT</Button>
        </div>
      </div>
    )
  }
}