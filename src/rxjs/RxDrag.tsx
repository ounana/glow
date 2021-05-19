import React, { useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
/**
 * takeUntil 某个时候结束流
 * mergeMap 合并一个流
 */

export default function RxDrag() {
  const drag = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const { current: dom } = drag
    if (!dom) return

    let startOffsetX: number, endOffsetY: number

    const mouseUp = fromEvent(document, 'mouseup')
    const mouseMove = fromEvent(document, 'mousemove').pipe(
      takeUntil(mouseUp)
    )
    const mouseDown = fromEvent(dom, 'mousedown')
    const observable = mouseDown.pipe(
      mergeMap(e => mouseMove)
    )

    const start = mouseDown.subscribe(e => {
      const { offsetX, offsetY } = e as any
      startOffsetX = offsetX
      endOffsetY = offsetY
    })

    const move = observable.subscribe((e: any) => {
      const [left, top] = [e.clientX - startOffsetX, e.clientY - endOffsetY]
      dom.style.left = left + 'px'
      dom.style.top = top + 'px'
    })

    return () => {
      start.unsubscribe()
      move.unsubscribe()
    }
  })
  return (
    <>
      <h1>Rx_Drag</h1>
      <div ref={drag} style={{
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'blue',
        cursor: 'move'
      }}></div>
    </>
  )
}