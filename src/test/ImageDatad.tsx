import { createRef, PureComponent } from 'react'

export default class ImageDatad extends PureComponent {
  canvas = createRef<HTMLCanvasElement>()
  canvas2 = createRef<HTMLCanvasElement>()
  componentDidMount() {
    this.ImageDataRender()
    this.ColorSpaceRender()
  }
  ImageDataRender = () => {
    const ctx = this.canvas.current?.getContext('2d')!
    const [width, height] = [280, 280]
    const imageData = new ImageData(width, height)
    /**
     * ImageData.prototype.data: Uint8ClampedArray
     * 八位无符号整型数组，一个位置占一个字节
     * 每个位置所存储十进制范围为0 ~ 255
     * 
     * length = width * height * 4
     * 每四个位置表示一个像素点，存储R G B A 的值
     * 
     */
    for (let i = 0; i < width * height; i++) {
      // R  G  B  A   0 ~ 255
      // 红 绿 蓝 色彩空间/透明度
      const index = i * 4
      const [R, G, B, A] = [255, 0, 0, 255]
      imageData.data[index + 0] = R
      imageData.data[index + 1] = G
      imageData.data[index + 2] = B
      imageData.data[index + 3] = A
    }
    console.log(imageData)
    ctx.putImageData(imageData, 0, 0)
  }

  ColorSpaceRender = () => {
    var ctx = this.canvas2.current?.getContext('2d')!
    var grd = ctx.createLinearGradient(0, 0, 256, 0)
    grd.addColorStop(0, "rgb(0,0,255)")
    grd.addColorStop(0.25, "rgb(0,255,0)")
    grd.addColorStop(0.5, "rgb(255,255,0)")
    grd.addColorStop(0.75, "rgb(255,0,0)")
    ctx.fillStyle = grd
    ctx.fillRect(0, 0, 256, 100)
    ctx.rect(0, 0, 256, 100)
    const data = ctx.getImageData(0, 0, 256, 100)
    console.log(data)
  }

  getImageData() {
    const ctx = document.createElement('canvas').getContext('2d')!
    const img = new Image()
    img.src = '/c.png'
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img
      ctx!.drawImage(img, 0, 0, naturalWidth, naturalHeight)
      const data = ctx.getImageData(0, 0, naturalWidth, naturalHeight)
      console.log(data)
    }
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvas} width={600} height={400} style={{ border: '1px solid' }} />
        <canvas ref={this.canvas2} width={300} height={400} style={{ border: '1px solid' }} />
      </div >
    )
  }
}