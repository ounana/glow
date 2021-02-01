import { Button } from "antd";
import { createRef, PureComponent } from "react";

let levels = [
  [
    [50, 50,],
    [150, 120,],
  ],
  [
    [50, 0,],
    [100, 100,],
    [150, 130,],
  ],
  [
    [50, 30,],
    [100, 100, 2,],
    [200, 100,],
  ],
]

//定义砖块
class Block {
  width = 71
  height = 19
  alive = true
  lifes = 2
  constructor(public x: number, public y: number) { }
  kill() {
    this.lifes--
    if (this.lifes < 1) this.alive = false
  }
  collide(b: Ball) {
    const a = this
    const cond1 = [a.x + a.width / 2, a.y + a.height / 2]
    const cond2 = [b.x + b.width / 2, b.y + b.height / 2]
    const cx = Math.abs(cond1[0] - cond2[0])
    const cy = Math.abs(cond1[1] - cond2[1])
    if (cx <= (a.width / 2 + b.width / 2)) {
      if (cy <= (a.height / 2 + b.height / 2)) {
        return true
      }
    }
    return false
  }
}

//定义挡板对象
class Paddle {
  x: number = 100
  y: number = 400
  width = 300
  height = 30
  speed = 10
  move(v: number) {
    if (v < 0) v = 0
    if (v > 600 - this.width) {
      v = 600 - this.width
    }
    this.x = v
  }
  moveLeft() {
    this.move(this.x - this.speed)
  }
  moveRight() {
    this.move(this.x + this.speed)
  }
  //定义相撞函数
  collide(b: Ball) {
    const a = this
    const cond1 = [a.x + a.width / 2, a.y + a.height / 2]
    const cond2 = [b.x + b.width / 2, b.y + b.height / 2]
    const cx = Math.abs(cond1[0] - cond2[0])
    const cy = Math.abs(cond1[1] - cond2[1])
    if (cx <= (a.width / 2 + b.width / 2)) {
      if (cy <= (a.height / 2 + b.height / 2)) {
        return true
      }
    }
    return false
  }
}
//定义弹射球
class Ball {
  width = 50
  height = 50
  x = 100
  y = 250
  speedX = 5
  speedY = 5
  fired = false //发射开关
  move() {
    if (!this.fired) return
    if (this.x < 0 || this.x + this.width > 600) this.speedX *= -1
    if (this.y < 0 || this.y + this.height > 500) this.speedY *= -1
    this.x += this.speedX
    this.y += this.speedY
  }
  suspend() {
    this.fired = !this.fired
  }
  reboundY() {
    this.speedY *= -1
  }
  reboundX() {
    this.speedX *= -1
  }
}

class Game {
  width: number
  height: number
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keydowns: { [key: string]: boolean } = {}
  actions: { [key: string]: () => void } = {}
  fps = 30
  blocks: Block[] = []
  status: 'start' | 'end' = 'start'
  constructor(root: Element, public paddle: Paddle, public ball: Ball) {
    this.canvas = document.createElement('canvas')
    root.appendChild(this.canvas)
    const [width, height] = [600, 500]
    this.width = width
    this.height = height
    this.canvas.width = width
    this.canvas.height = height
    this.canvas.style.border = '1px solid'
    this.ctx = this.canvas.getContext('2d')!

    levels[1].forEach(l => {
      const block = new Block(l[0], l[1])
      this.blocks.push(block)
    })

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)

    this.registerAction('a', () => {
      this.paddle.moveLeft()
    })
    this.registerAction('d', () => {
      this.paddle.moveRight()
    })
    this.registerAction('s', () => {
      this.ball.suspend()
    })
    this.runloop()
  }
  onKeyDown = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = true
  }
  onKeyUp = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = false
  }
  over() {
    this.status = 'end'
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }
  registerAction(key: string, callback: () => void) {
    this.actions[key] = callback
  }
  runloop() {
    //擦除上一帧
    for (let key in this.keydowns) {
      if (this.keydowns[key]) {
        if (this.actions[key]) this.actions[key]()
      }
    }
    this.update()
    this.clearCtx()
    this.draw()
    if (this.status === 'end') return
    //next frame
    setTimeout(() => {
      this.runloop()
    }, 1000 / this.fps)
  }

  update() {
    this.ball.move()
    if (this.paddle.collide(this.ball)) {
      this.ball.reboundY()
    }
    this.blocks.forEach(b => {
      if (b.collide(this.ball)) {
        this.ball.reboundY()
        b.kill()
      }
    })
    this.blocks = this.blocks.filter(b => b.alive)
  }

  draw() {
    this.drawPaddle()
    this.drawBall()
    this.drawBlock()
  }
  drawBlock() {
    this.blocks.forEach(b => {
      this.ctx.fillStyle = 'black'
      this.ctx.fillRect(b.x, b.y, b.width, b.height)
    })
  }
  drawPaddle() {
    this.ctx.fillStyle = 'black'
    this.ctx.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height)
  }
  drawBall() {
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.ball.x, this.ball.y, this.ball.width, this.ball.height)
  }
  //封装画图功能
  drawImage(img: HTMLImageElement) {
    this.ctx.drawImage(img, img.x, img.y)
  }
  //封装擦画板功能
  clearCtx() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}
export default class GuaGame extends PureComponent {
  rootDivRef = createRef<HTMLDivElement>()
  game: Game | null = null
  componentDidMount() {
    const rootDiv = this.rootDivRef.current as HTMLDivElement
    this.game = new Game(rootDiv, new Paddle(), new Ball())
  }
  componentWillUnmount() {
    this.game?.over()
  }
  onEndClick = () => {
    this.game?.over()
  }
  render() {
    return (
      <div ref={this.rootDivRef}>
        <Button onClick={this.onEndClick}>END</Button>
      </div>
    )
  }
}