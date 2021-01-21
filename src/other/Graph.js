import React, { useRef, useEffect } from 'react'
/**
 * SHARE_X / SHARE_Y 轴分段
 * STEP_X / STEP_Y 分段长度
 * HORN 轴触角长
 * RANGE_X / RANGE_Y 范围
 * SHARE_Y / SHARE_X 份数
 * DATA 数据
 */

export default function Graph(props) {
  const ref = useRef(null)
  const INIT_DATA = [{ x: 0, y: 100 }, { x: 1000, y: 300 }, { x: 5000, y: 500 }, { x: 8000, y: 200 }]
  const { CW = 800, CH = 600, DATA = INIT_DATA } = props
  const { TOP = 20, LEFT = 30, BOTTOM = 30, RIGHT = 30 } = props
  const { SHARE_X = 9, SHARE_Y = 5, HORN = 6 } = props
  const { RANGE_X = [0, 9000], RANGE_Y = [0, 500] } = props

  const [WIDTH, HEIGHT] = [CW - LEFT - RIGHT, CH - TOP - BOTTOM]
  const [STEP_X, STEP_Y] = [WIDTH / SHARE_X, HEIGHT / SHARE_Y]
  useEffect(() => {
    DRAW(ref)
  }, [])
  function DRAW(ref) {
    const { current: canvas } = ref
    setView(canvas)
    const ctx = getContext(canvas)
    drawAxisX(ctx)
    drawAxisY(ctx)
    drawLine(ctx)
    ctx.stroke()
  }
  function drawLine(ctx) {
    const numb = DATA.map(v => ({
      x: LEFT + (v.x / (RANGE_X[1] / SHARE_X)) * STEP_X,
      y: TOP + HEIGHT - (v.y / (RANGE_Y[1] / SHARE_Y)) * STEP_Y
    }))

    numb.forEach((v, i) => {
      i === 0 ? ctx.moveTo(v.x, v.y) : ctx.lineTo(v.x, v.y)
    })
  }
  function drawAxisX(ctx) {
    const numb = (RANGE_X[1] - RANGE_X[0]) / SHARE_X
    for (let i = 0; i < SHARE_X; i++) {
      ctx.moveTo(LEFT + (i * STEP_X), HEIGHT + TOP)
      ctx.lineTo(LEFT + ((i + 1) * STEP_X), HEIGHT + TOP)
      ctx.lineTo(LEFT + ((i + 1) * STEP_X), HEIGHT + TOP + HORN)

      const numz = parseInt(numb * (i + 1))
      ctx.fillText(numz, LEFT + ((i + 1) * STEP_X) - 10, HEIGHT + TOP + HORN + 12)
    }
  }
  function drawAxisY(ctx) {
    const numb = (RANGE_Y[1] - RANGE_Y[0]) / SHARE_Y
    for (let i = 0; i < SHARE_Y; i++) {
      ctx.moveTo(LEFT - HORN, TOP + (STEP_Y * i))
      ctx.lineTo(LEFT, TOP + (STEP_Y * i))
      ctx.lineTo(LEFT, TOP + (STEP_Y * (i + 1)))

      const numz = parseInt(numb * (i + 1))
      ctx.fillText(numz, LEFT - HORN - 22, HEIGHT + TOP - ((i + 1) * STEP_Y))
    }
  }
  function getContext(canvas) {
    return canvas.getContext('2d')
  }
  function setView(canvas) {
    canvas.width = CW
    canvas.height = CH
  }
  return (
    <canvas ref={ref}></canvas>
  )
}