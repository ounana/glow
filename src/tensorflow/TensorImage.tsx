import { Button, Divider } from "antd";
import { createRef, PureComponent } from "react";
import * as tf from '@tensorflow/tfjs'

enum SHAPE {
  Rock = 0,
  Paper = 1,
  Scissors = 2
}

export default class TensorImage extends PureComponent {
  videoRef = createRef<HTMLVideoElement>()
  canvasRef = createRef<HTMLCanvasElement>()
  mediaStream: MediaStream | null = null
  model: tf.Sequential | null = null
  xs: tf.Tensor4D | null = null
  ys: tf.Tensor2D | null = null
  onOpenCameraClick = () => {
    const video = this.videoRef.current!
    const { width, height } = video
    navigator.mediaDevices.getUserMedia({
      video: { width, height }
    }).then(mediaStream => {
      video.srcObject = mediaStream
      this.mediaStream = mediaStream
    }).catch(err => {
      console.log(err)
    })
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
  onKeepImage = (sha: SHAPE) => {
    const video = this.videoRef.current!
    const canvas = this.canvasRef.current!
    const ctx = canvas.getContext('2d')!
    //只要一个通道，红色通道
    const image3d = tf.browser.fromPixels(video, 1)
    //调整双线性图像大小为28x28
    const resized = tf.image.resizeBilinear(image3d, [28, 28])
    //转换为tensor4D结构
    const xs = resized.as4D(1, 28, 28, 1)
    const ysd = new Array(3).fill(0).fill(1, sha, sha + 1)
    const ys = tf.tensor2d(ysd, [1, 3])
    this.keepXs(xs)
    this.keepYs(ys)

    //预览图片
    const image = image3d.dataSync()
    const imageData = new ImageData(280, 280)
    for (let i = 0; i < 280 * 280; i++) {
      const j = i * 4
      imageData.data[j + 0] = image[i]
      imageData.data[j + 1] = 0
      imageData.data[j + 2] = 0
      imageData.data[j + 3] = 255
    }
    ctx.putImageData(imageData, 0, 0)
  }
  createModel = () => {
    const model = tf.sequential({
      layers: [
        tf.layers.flatten({ inputShape: [28, 28, 1] }),
        tf.layers.dense({ units: 100, activation: 'relu' }),
        tf.layers.dense({ units: 3, activation: 'softmax' })
      ]
    })
    const optimizer = tf.train.adam(0.0001)
    model.compile({ optimizer: optimizer, loss: 'categoricalCrossentropy' })
    model.summary()
    this.model = model
  }
  train = () => {
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
  render() {
    return (
      <div style={{ padding: '20px' }}>
        <video
          autoPlay
          controls
          ref={this.videoRef}
          width={280} height={280}
          style={{
            marginRight: '10px',
            verticalAlign: 'top'
          }}
        />
        <canvas ref={this.canvasRef} width={280} height={280} style={{
          border: '.5px solid', verticalAlign: 'top', marginRight: '10px'
        }} />
        <div style={{ display: 'inline-block' }}>
          <Button onClick={this.onOpenCameraClick} size="large">OPEN CAMERA</Button>
          <Button onClick={this.createModel} size="large">CREATE MODEL</Button>
          <Button onClick={this.train} size="large">TRAIN MODEL</Button>
          <Divider />
          <Button onClick={() => this.onKeepImage(SHAPE.Rock)} size="large">Rock</Button>
          <Button onClick={() => this.onKeepImage(SHAPE.Paper)} size="large">Paper</Button>
          <Button onClick={() => this.onKeepImage(SHAPE.Scissors)} size="large">Scissors</Button>
        </div>

      </div>
    )
  }
}