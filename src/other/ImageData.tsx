export default 2
// import React, { useEffect, useRef } from 'react'
// import { PaperScope } from 'paper'

// export default () => {
//   const canvas = useRef<HTMLCanvasElement>(null)
//   const canvas2 = useRef<HTMLCanvasElement>(null)
//   const paper = useRef(new PaperScope())
  
//   useEffect(() => {
//     if (!canvas.current) return
//     paper.current.setup(canvas.current)

//     ImageDataRender()
//     ColorSpaceRender()
//   }, [])

//   const ImageDataRender = () => {
//     const [width, height] = [600, 400]
//     const size = new paper.current.Size(width, height)
//     const raster = new paper.current.Raster(size)
//     raster.position = paper.current.view.center
//     const imageData = new ImageData(width, height)
//     //总共多少个像素点 = w * h
//     //一个像素点占用Uint8ClampedArray四个位置 =  R G B A
//     //Uint8ClampedArray 8 位无符号整数，长度 1 个字节，范围为 0 ~ 255
//     let index = 0
//     for (let i = 0; i < height; i++) {
//       for (let j = 0; j < width; j++) {
//         // R  G  B  A   0 ~ 255
//         // 红 绿 蓝 透明度
//         const [R, G, B, A] = [
//           255 * Math.random(), 255 * Math.random(),
//           255 * Math.random(), 255 * Math.random()
//         ]
//         imageData.data[index + 0] = R
//         imageData.data[index + 1] = G
//         imageData.data[index + 2] = B
//         imageData.data[index + 3] = A
//         index += 4
//       }
//     }
//     console.log(imageData)
//     raster.setImageData(imageData, new paper.current.Point(0, 0))
//   }

//   const ColorSpaceRender = () => {
//     if (!canvas2.current) return
//     var ctx: CanvasRenderingContext2D | null = canvas2.current!.getContext('2d')
//     if (!ctx) return
//     var grd = ctx.createLinearGradient(0, 0, 256, 0)
//     grd.addColorStop(0.25, "rgb(0,0,255)")
//     grd.addColorStop(0.5, "rgb(0,255,0)")
//     grd.addColorStop(0.75, "rgb(255,255,0)")
//     grd.addColorStop(1.0, "rgb(255,0,0)")
//     ctx.fillStyle = grd
//     ctx.fillRect(0, 0, 256, 50)
//     const data = ctx.getImageData(0, 0, 256, 50)
//     console.log(data)
//   }

  
//   return (
//     <div>
//       <canvas
//         ref={canvas}
//         height={600} width={900}
//         style={{ border: '1px solid #bbb' }}
//       ></canvas>
//       <canvas
//         ref={canvas2}
//         width={300} height={100}
//         style={{ border: '1px solid #bbb' }}
//       ></canvas>
//     </div>
//   )
// }


// /*
// function getImageData() {
//   const can = document.createElement('canvas')
//   const ctx = can.getContext('2d')
//   const img = new Image()
//   img.src = '/c.png'
//   img.onload = () => {
//     const { width, height } = img
//     ctx.drawImage(img, 0, 0, width, height)
//     const data = ctx.getImageData(0, 0, width, height)
//     console.log(data)
//   }
// }
// */
