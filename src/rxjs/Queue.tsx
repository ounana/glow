import { useRef, useEffect, useState } from 'react'
import { interval, Subject } from 'rxjs';
import { map, concatMap, take } from 'rxjs/operators';

export default function Queue() {
  const source = useRef<HTMLButtonElement>(null)
  const content = useRef<HTMLDivElement>(null)
  const subject = useRef<Subject<number>>(new Subject())
  const [nums, setNums] = useState<number[]>([])
  const click = () => {
    const random = ~~(Math.random() * 10)
    subject.current.next(random)
    setNums([random, ...nums])
  }

  useEffect(() => {
    const observable = subject.current.pipe(
      concatMap(v => interval(1000).pipe(take(1), map(x => v)))
    )
    const subscription = observable.subscribe(v => {
      content.current && writeBall(v, content.current)
    })
    subject.current.subscribe(v => {
      console.log(v)
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <div style={{ margin: 10, overflow: 'hiden' }}>
      <h1>RxJs 队列实现</h1>
      <button ref={source} onClick={click}>source</button>
      <div style={{ height: 100, position: 'relative' }} ref={content}></div>
      <div>{nums.map((n, key) => <span key={key} style={{ margin: '0 5px' }}>{n}</span>)}</div>
    </div>
  )
}

//写入流
const writeBall = (num: number, content: HTMLDivElement) => {
  const RANGE = [0, 80] as const
  let currentOffset = RANGE[0]
  const INCREMENT = .2
  const FPS = 40

  const color = 'rgba(' + [
    Math.random() * 255,
    Math.random() * 255,
    Math.random() * 255
  ].join(',') + ', 1)'
  const ball = document.createElement('div')
  ball.style.position = 'absolute'
  ball.style.top = '25px'
  ball.style.left = RANGE[0] + '%'
  ball.style.width = '50px'
  ball.style.height = '50px'
  ball.style.background = color
  ball.style.borderRadius = '50%'
  ball.style.fontSize = '16px'
  ball.style.textAlign = 'center'
  ball.style.lineHeight = '50px'
  ball.style.color = '#fff'
  ball.style.boxShadow = '1px 1px 1px #bbb'
  ball.innerHTML = num.toString()
  content.appendChild(ball)

  const id = setInterval(() => {
    currentOffset += INCREMENT
    ball.style.left = currentOffset + '%'
    if (currentOffset > RANGE[1]) {
      clearInterval(id)
      content.removeChild(ball)
    }
  }, 1000 / FPS)
}
