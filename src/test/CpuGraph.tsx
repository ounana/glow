import React, { useRef, useEffect } from 'react'

export default () => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const { current: cvs } = ref
    if (!cvs) return
    const ctx = cvs.getContext('2d')
    if (!ctx) return
    cvs.width = 1000
    cvs.height = 300
    ctx.beginPath()
    let t = Date.now(), i = 0
    let cpuTimer = setInterval(() => {
      let wave = Date.now() - t - 500
      t = Date.now()
      wave *= 5
      console.log(wave)
      ctx.lineTo(i * 5, wave + 100)
      ctx.stroke()
      i++
    }, 500)
    return () => {
      clearInterval(cpuTimer)
    }
  }, [])
  return (
    <div>
      <canvas ref={ref} style={{ border: '1px solid #000', margin: 5 }}></canvas>
    </div>
  )
}