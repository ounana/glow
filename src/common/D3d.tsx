export default 2
// import React, { useRef, useEffect } from 'react'
// import * as d3 from 'd3'

// export default function D3Root() {
//   const div = useRef<HTMLDivElement>(null)
//   useEffect(() => {
//     //获取容器
//     if (!div.current) return

//     const dvhReact = div.current.getBoundingClientRect()
//     const cWidth = dvhReact.width
//     const cHeight = dvhReact.height

//     //置入svg
//     const svg = d3.select(div.current)
//       .append('svg')
//       .attr('width', cWidth)
//       .attr('height', cHeight)

//     //布局常量
//     const [top, right, bottom, left] = [40, 30, 50, 50]
//     const width = cWidth - right - left
//     const height = cHeight - top - bottom

//     //视图组
//     const graph = svg.append('g')
//       .attr('transform', 'translate(' + left + ',' + top + ')')
//       .attr('class', 'graph')

//     //背景
//     const back = graph.append('rect')
//       .attr('class', 'back')
//       .attr('width', width)
//       .attr('height', height)
//       .attr('rx', 0)
//       .attr('ry', 0)
//       .attr('fill', 'rgb(50,50,50)')
//     back.on('mousemove', handleMove)

//     //y轴
//     const y: any = d3.scaleLinear()
//       .range([height, 0])
//       .domain([0, 100])
//     graph
//       .append('g')
//       .call(d3.axisLeft(y))
//       .attr('color', 'white')
//       .append('text')
//       .attr('transform', 'rotate(-90)')
//       .attr('y', -45)
//       .attr('dy', '1em')
//       .text('Ratio of Total Structure Volume [%]')
//       .attr('fill', 'white')

//     //x轴
//     const x: any = d3.scaleLinear()
//       .range([0, width])
//       .domain([0, 8000])
//     graph
//       .append('g')
//       .call(d3.axisBottom(x))
//       .attr('color', 'white')
//       .attr('transform', 'translate(0,' + height + ')')
//       .append('text')
//       .attr('x', width / 2)
//       .attr('y', 25)
//       .attr('dy', '1em')
//       .text('Dose [cGy]')
//       .attr('fill', 'white')

//     //曲线
//     const curveLine = d3.line()
//       .x(d => x(d[0]))
//       .y(d => y(d[1]))
//       .curve(d3.curveCatmullRom.alpha(0.5))

//     graph.selectAll('.lines')
//       .data(data)
//       .enter()
//       .append('path')
//       .attr('class', d => d.name)
//       .attr('d', d => curveLine(d.line))
//       .style('stroke', d => d.color)
//       .style('stroke-width', '1.5px')
//       .attr('fill', 'none')

//     //标线
//     const crossGroup = graph.append('g')
//       .attr('class', 'cross-v')
//       .style('display', 'none')
//     const crossX = crossGroup
//       .append('line')
//       .attr('x1', 0)
//       .attr('y1', 100)
//       .attr('x2', width)
//       .attr('y2', 100)
//       .attr('stroke', 'rgb(255,0,109)')
//       .attr('stroke-dasharray', '5, 5')
//     const crossY = crossGroup
//       .append('line')
//       .attr('x1', 100)
//       .attr('y1', 0)
//       .attr('x2', 100)
//       .attr('y2', height)
//       .attr('stroke', 'rgb(255,0,109)')
//       .attr('stroke-dasharray', '5, 5')

//     function handleMove() {
//       if (crossGroup.style('display') === 'none') {
//         crossGroup.style('display', 'initial')
//       }
//       const backNode: HTMLElement | null = document.querySelector('.back')
//       const [x, y] = d3.mouse(backNode!)
//       crossY.attr('x1', x)
//       crossY.attr('x2', x)
//       crossX.attr('y1', y)
//       crossX.attr('y2', y)
//     }
//     svg.on('mouseleave', handleOut)
//     function handleOut() {
//       crossGroup.style('display', 'none')
//     }
//   }, [])
//   return (
//     <div
//       ref={div}
//       style={{ height: '50vh', width: '100vw', backgroundColor: 'black' }}
//     >
//     </div>
//   )
// }

// interface DataLine {
//   name: string
//   color: string
//   line: [number, number][]
// }
// const data: DataLine[] = [{
//   name: 'bar',
//   color: 'blue',
//   line: [[0, 10], [1000, 60], [4000, 50], [5000, 90], [8000, 0]]
// }, {
//   name: 'foo',
//   color: 'green',
//   line: [[0, 20], [1000, 30], [4000, 40], [5000, 80], [8000, 60]]
// }]