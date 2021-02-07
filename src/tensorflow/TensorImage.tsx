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
    this.updateCount(sha)

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
    const model = tf.sequential()
    model.add(tf.layers.conv2d({
      inputShape: [28, 28, 1],
      kernelSize: 3,
      filters: 16,
      activation: 'relu'
    }))
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))
    model.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }))
    model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }))
    model.add(tf.layers.conv2d({ kernelSize: 3, filters: 32, activation: 'relu' }))
    model.add(tf.layers.flatten())
    model.add(tf.layers.dense({ units: 64, activation: 'relu' }))
    model.add(tf.layers.dense({ units: 3, activation: 'softmax' }))
    model.compile({ optimizer: 'rmsprop', loss: 'categoricalCrossentropy', metrics: ['accuracy'] })
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
  predict = () => {
    if (!this.model || !this.xs) return
    const video = this.videoRef.current!
    const image3d = tf.browser.fromPixels(video, 1)
    const resized = tf.image.resizeBilinear(image3d, [28, 28])
    const xs = resized.as4D(1, 28, 28, 1)
    const prediction = this.model.predict(xs) as tf.Tensor
    console.log(prediction.argMax(1).dataSync())
  }
  render() {
    const { rock, paper, scissors } = this.state
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
          <h2>Rock: {rock}, Paper: {paper}, Scissors: {scissors}</h2>
          <Divider />
          <Button onClick={this.predict}>PREDICT</Button>

        </div>

      </div>
    )
  }
}