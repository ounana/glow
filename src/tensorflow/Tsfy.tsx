import { createRef, PureComponent } from "react";
import * as tf from '@tensorflow/tfjs'
import { Button } from "antd";

enum GESTURE {
  Rock = 0,
  Paper = 1,
  Scissors = 2
}
export default class Tsfy extends PureComponent {
  videoRef = createRef<HTMLVideoElement>()
  canvasRef = createRef<HTMLCanvasElement>()
  xs: tf.Tensor4D | null = null
  ys: tf.Tensor2D | null = null
  model: tf.Sequential | null = null
  mobilenet: tf.LayersModel | null = null
  componentDidMount() {
    this.setup()
    this.createModel()
    this.loadMobilenet()
    // this.downloadMobilenet()
  }
  async downloadMobilenet() {
    const mobilenet = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json')
    const layer = mobilenet.getLayer('conv_pw_13_relu')
    const mymodel = tf.model({ inputs: mobilenet.inputs, outputs: layer.output })
    await mymodel.save('downloads://mobilenet')
    console.log('模型下载成功')
  }
  async loadMobilenet() {
    this.mobilenet = await tf.loadLayersModel('http://localhost:4000/model/mobilenet.json')
    console.log('模型加载成功')
  }
  createModel = () => {
    const model = tf.sequential({
      layers: [
        tf.layers.flatten({ inputShape: [7, 7, 256] }),
        tf.layers.dense({ units: 100, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' })
      ]
    })
    const optimizer = tf.train.adam(0.0001)
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' })
    model.summary()
    this.model = model
  }
  setup() {
    const video = this.videoRef.current!
    navigator.mediaDevices.getUserMedia({
      // audio: true,
      video: { width: 224, height: 224 }
    }).then(stream => {
      video.srcObject = stream
      video.onloadedmetadata = evt => {
        video.play()
      }
    })
  }

  onTrain = () => {
    if (!this.xs || !this.ys || !this.model) return
    this.model.fit(this.xs, this.ys, {
      epochs: 50,
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
    const xs = image3d.as4D(1, 224, 224, 3)
    const mxs = this.mobilenet.predict(xs) as tf.Tensor4D
    const prediction = this.model.predict(mxs) as tf.Tensor
    console.log(prediction.argMax(1).dataSync())
  }
  onKeepClick = (evt: GESTURE) => {
    if (!this.mobilenet) return
    const video = this.videoRef.current!
    const canvas = this.canvasRef.current!
    const image3d = tf.browser.fromPixels(video)
    const ysd = new Array(3).fill(0).fill(1, evt, evt + 1)
    const cys = tf.tensor2d(ysd, [1, 3])
    const cxs = image3d.as4D(1, 224, 224, 3)

    const mxs = this.mobilenet.predict(cxs) as tf.Tensor4D
    // console.log(mxs)
    if (this.ys) {
      const oldYs = this.ys
      this.ys = tf.keep(oldYs.concat(cys, 0))
      oldYs.dispose()
    } else {
      this.ys = tf.keep(cys)
    }
    if (this.xs) {
      const oldXs = this.xs
      this.xs = tf.keep(oldXs.concat(mxs, 0))
      oldXs.dispose()
    } else {
      this.xs = tf.keep(mxs)
    }
    // console.log(this.xs)
    console.log(this.ys)

    //预览图片
    const image = image3d.dataSync()
    const ctx = canvas.getContext('2d')!
    const imageData = new ImageData(224, 224)
    for (let i = 0; i < 224 * 224; i++) {
      const j = i * 4
      const k = i * 3
      imageData.data[j + 0] = image[k]
      imageData.data[j + 1] = image[k]
      imageData.data[j + 2] = image[k]
      imageData.data[j + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
    image3d.dispose()
  }
  render() {
    return (
      <div>
        <video
          ref={this.videoRef}
          controls
          autoPlay
          playsInline
          muted id="wc"
          width="224"
          height="224"
          style={{ border: '1px solid', verticalAlign: 'bottom' }}
        />
        <canvas width={224} height={224} ref={this.canvasRef}
          style={{ border: '1px solid', verticalAlign: 'bottom' }}
        />
        <Button onClick={() => this.onKeepClick(GESTURE.Rock)}>Rock</Button>
        <Button onClick={() => this.onKeepClick(GESTURE.Paper)}>Paper</Button>
        <Button onClick={() => this.onKeepClick(GESTURE.Scissors)}>Scissors</Button>
        <Button onClick={this.onTrain}>TRAIN</Button>
        <Button onClick={this.onPredict}>预测</Button>
      </div>
    )
  }
}