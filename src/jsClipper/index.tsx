import React, { useRef, useEffect } from 'react'
import { ClipperPath, ClipperPoint } from './types';
const ClipperLib = window.ClipperLib

export default () => {
  const canvas: React.RefObject<HTMLCanvasElement> = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!canvas.current) return
    const ctx: CanvasRenderingContext2D | null = canvas.current.getContext('2d')
    if (!ctx) return

    const path: ClipperPath = [
      { X: 100, Y: 90 }, { X: 300, Y: 80 },
      { X: 350, Y: 200 }, { X: 250, Y: 180 },
      { X: 180, Y: 270 }, { X: 100, Y: 190 }
    ]
    drawPath(path, 'blue', ctx)

    //外扩
    const retPath = scaleOut(path, 20)
    drawPath(retPath, 'green', ctx)

    //测试包含
    var poly: ClipperPath = [
      { X: 100, Y: 100 }, { X: 200, Y: 100 },
      { X: 200, Y: 200 }, { X: 100, Y: 200 }
    ]
    drawPath(poly, 'black', ctx)
    const ret = PointInPolygon(poly, { X: 150, Y: 150 })
    console.log(ret)

  }, [])

  /**
   * 判断是否被多边形包含
   * @param poly 源
   * @param point 测试的点
   * @returns -1 在边缘上， 1 包含， 0 未包含
   */
  const PointInPolygon = (
    poly: ClipperPath, point: ClipperPoint
  ): -1 | 0 | 1 => {
    const pt = new ClipperLib.IntPoint(point.X, point.Y)
    const ret = ClipperLib.Clipper.PointInPolygon(pt, poly)
    return ret
  }

  /**
   * 外扩路径
   * @param path 源
   * @param scale 缩放比例
   * 
   * void AddPath(Path path, JoinType jointype, EndType endtype);
   * JoinType 0 - 2
   * EndType  0 - 4
   */
  const scaleOut = (path: ClipperPath, scale: number): ClipperPath => {
    var ret = new ClipperLib.Paths()
    var co = new ClipperLib.ClipperOffset()
    co.ArcTolerance = 0.25
    co.AddPath(path, 1, 4)
    co.Execute(ret, scale)
    return ret[0]
  }

  const drawPath = (
    path: ClipperPath, color: string, ctx: CanvasRenderingContext2D
  ): void => {
    const firstPoint = path[0]
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.moveTo(firstPoint.X, firstPoint.Y)
    path.slice(1).forEach(p => ctx.lineTo(p.X, p.Y))
    ctx.closePath()
    ctx.stroke()
  }

  return (
    <div>
      <canvas
        ref={canvas}
        width={800}
        height={500}
        style={{ border: '1px solid #bbb' }}
      ></canvas>
    </div>
  )
}