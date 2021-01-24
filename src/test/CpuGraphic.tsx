import { useRef, useEffect } from 'react'

export default function CpuGraphic() {
  const divdom = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const div = divdom.current
    if (!div) return
    const cvs = document.createElement('canvas')
    div.appendChild(cvs)
    const divRect = div.getBoundingClientRect()
    const ctx = cvs.getContext('2d')!
    cvs.width = divRect.width
    cvs.height = divRect.height

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
    <div ref={divdom} style={{ border: '1px solid', height: 300 }} />
  )
}