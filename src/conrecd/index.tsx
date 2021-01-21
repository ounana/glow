export default 2
// import React, { useRef, useEffect } from 'react'
// import { data } from './data';
// import { fromJS } from 'immutable'
// import * as d3 from 'd3'
// import { Conrec } from 'conrec'
// import { PaperScope } from 'paper'

// //初始化 paper 对象
// const paper = new PaperScope()

// export default () => {
//   const canvas = useRef<HTMLCanvasElement>(null)
//   useEffect(() => {
//     if (!canvas.current) return
//     //设置 canvas 视图
//     paper.setup(canvas.current)

//     const dataCopy: number[][] = fromJS(data).toJS()
//     console.log(dataCopy)
    
//     //包装轮廓
//     const cliff = -100
//     const xcliff = d3.range(dataCopy[0].length).map(v => cliff)
//     dataCopy.unshift(xcliff)
//     dataCopy.push(xcliff)
//     dataCopy.forEach(x => {
//       x.unshift(cliff)
//       x.push(cliff)
//     })
//     //定义宽高
//     const [w, h, width, height] = [
//       dataCopy[0].length,
//       dataCopy.length,
//       600,
//       500
//     ]
//     //定义缩放函数
//     const x = d3.scaleLinear().range([0, width]).domain([0, w])
//     const y = d3.scaleLinear().range([0, height]).domain([0, h])
//     const color = d3.scaleLinear<string, string>().range(["white", "green"]).domain([-4, 2])
//     //标尺

//     const [xs, ys, zs] = [
//       d3.range(0, w),
//       d3.range(0, h),
//       //分布范围，最大值与最小值范围 d3.range(-4, 2, .5), 从小到大排列
//       d3.range(-2, 2, 1)
//     ]

//     const conrec = new Conrec()
//     conrec.contour(
//       dataCopy,
//       0, ys.length - 1,
//       0, xs.length - 1,
//       ys,
//       xs,
//       zs.length,
//       zs
//     )
//     const ret = conrec.contourList()
//     const lines = ret.map((l: any) => ({
//       k: l.k,
//       level: l.level,
//       data: l.map((p: any) => ({ x: x(p.x), y: y(p.y) })),
//       color: color(l.level)
//     }))

//     console.log(lines)

//     lines.forEach(l => {
//       const path = new paper.Path(l.data)
//       path.strokeColor = new paper.Color('black')
//       path.fillColor = new paper.Color(l.color!)
//     })

//   }, [])

//   return (
//     <div>
//       <canvas
//         ref={canvas}
//         height={600} width={900}
//         style={{ border: '1px solid #ccc' }}
//       ></canvas>
//     </div>
//   )
// }