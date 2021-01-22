import { useEffect, useRef } from 'react'
import style from './style.module.css'

const WINDOW_WIDTH = window.innerWidth
const WINDOW_HEIGHT = window.innerHeight
const BALLOON_NUM = 10;

export default () => {
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!box.current) return
    const Ballons: Balloon[] = []
    for (let i = 0; i < BALLOON_NUM; i++) {
      const balloon = new Balloon(box.current)
      Ballons.push(balloon)
      box.current.appendChild(balloon.document)
    }
  }, [])
  return (
    <div className={style.game} ref={box}></div>
  )
}

class Balloon {
  private speed: number
  document: HTMLDivElement
  width = 160
  height = 160
  timerUp: NodeJS.Timeout | null = null
  FPS: number = 30
  constructor(public root: HTMLDivElement) {
    this.speed = ~~(Math.random() * 8) + 1
    this.document = window.document.createElement('div')
    this.document.style.top = WINDOW_HEIGHT - this.height + 'px'
    this.document.style.left = ~~(Math.random() * (WINDOW_WIDTH - this.width)) + 'px'
    this.document.className = style.balloon
    this.move()
    //检测点击
    let once = 1
    this.document.addEventListener('click', () => {
      //这里模拟once事件
      if (once) {
        once = 0
        this.boom()
      }
    })
  }
  destory() {
    try {
      this.root.removeChild(this.document)
    } catch { }
  }
  move() {
    this.timerUp = setInterval(() => {
      const top = this.document.offsetTop - this.speed
      this.document.style.top = top + 'px'
      if (top < -this.height) {
        if (this.timerUp)
          clearInterval(this.timerUp)
        //删除节点
        this.destory()
      }
    }, 1000 / this.FPS)
  }
  boom() {
    const timerBoom = setInterval(() => {
      this.width -= 10
      this.height -= 10
      this.document.style.width = this.width + 'px'
      this.document.style.height = this.height + 'px'
      if (this.width < 10) {
        //清除变小的定时器
        clearInterval(timerBoom)
        //清除向上运动的定时器
        if (this.timerUp)
          clearInterval(this.timerUp)
        //删除节点
        this.destory()
      }
    }, 1000 / this.FPS)
  }
}