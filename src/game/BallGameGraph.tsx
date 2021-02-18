import { Button } from "antd";
import { createRef, PureComponent } from "react";

//砖块
class Block {
  width = 70
  height = 20
  alive = true
  lifes = 2
  constructor(public x: number, public y: number) { }
  kill() {
    this.lifes--
    if (this.lifes < 1) this.alive = false
  }
  collide(b: Ball) {
    //两个矩形中心点 x轴距离 <= 两个矩形宽和的一半 &&
    //两个矩形中心点 y轴距离 <= 两个矩形高和的一半
    const a = this
    const cond1 = [a.x + a.width / 2, a.y + a.height / 2]
    const cond2 = [b.x + b.width / 2, b.y + b.height / 2]
    const cx = Math.abs(cond1[0] - cond2[0])
    const cy = Math.abs(cond1[1] - cond2[1])
    if (cx <= (a.width + b.width) / 2 && cy <= (a.height + b.height) / 2) {
      return true
    }
    return false
  }
}

//挡板
class Paddle {
  x: number = 100
  y: number = 350
  width = 300
  height = 30
  speed = 10
  canvasWidth: number
  constructor(canvasWidth: number) {
    this.canvasWidth = canvasWidth
  }
  moveLeft() {
    let nextX = this.x - this.speed
    if (nextX < 0) nextX = 0
    this.x = nextX
  }
  moveRight() {
    let nextX = this.x + this.speed
    if (nextX > this.canvasWidth - this.width) nextX = this.canvasWidth - this.width
    this.x = nextX
  }
  //定义相撞函数
  collide(b: Ball) {
    //两个矩形中心点 x轴距离 <= 两个矩形宽和的一半 &&
    //两个矩形中心点 y轴距离 <= 两个矩形高和的一半
    const a = this
    const cond1 = [a.x + a.width / 2, a.y + a.height / 2]
    const cond2 = [b.x + b.width / 2, b.y + b.height / 2]
    const cx = Math.abs(cond1[0] - cond2[0])
    const cy = Math.abs(cond1[1] - cond2[1])
    if (cx <= (a.width + b.width) / 2 && cy <= (a.height + b.height) / 2) {
      return true
    }
    return false
  }
}

//弹球
class Ball {
  x = 100
  y = 250
  width = 50
  height = 50
  speedX = 3
  speedY = 3
  fired = false //发射开关
  lastBump = false //上一次是否发生相撞
  canvasWidth: number
  canvasHeight: number
  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth
    this.canvasHeight = canvasHeight
  }
  move() {
    if (!this.fired) return
    if (this.x < 0 || this.x + this.width > 600) this.reboundX()
    if (this.y < 0 || this.y + this.height > 400) this.reboundY()
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

class BallGame {
  width = 600
  height = 400
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  keydowns: { [key: string]: boolean } = {}
  actions: { [key: string]: () => void } = {}
  blocks: Block[] = []
  status: 'start' | 'end' = 'start'
  ball: Ball
  paddle: Paddle
  levels = [
    [[50, 50,], [150, 120,]],
    [[50, 0,], [100, 100,], [150, 130]],
    [[50, 30,], [100, 100], [200, 100]]
  ]
  constructor(root: Element) {
    this.ball = new Ball(this.width, this.height)
    this.paddle = new Paddle(this.width)
    this.canvas = document.createElement('canvas')
    root.appendChild(this.canvas)
    this.canvas.width = this.width
    this.canvas.height = this.height
    this.canvas.style.border = '1px solid'
    this.ctx = this.canvas.getContext('2d')!

    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)

    this.registerAction('a', () => {
      this.paddle.moveLeft()
    })
    this.registerAction('d', () => {
      this.paddle.moveRight()
    })
    this.frameLoop()
  }

  onKeyDown = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = true
    if (evt.key === 's') {
      this.ball.suspend()
    }
    const n = parseInt(evt.key)
    if (!isNaN(n)) {
      this.switchLevel(n)
    }
  }
  switchLevel = (n: number) => {
    n -= 1
    this.blocks = []
    this.levels[n]?.forEach(l => {
      const block = new Block(l[0], l[1])
      this.blocks.push(block)
    })
  }
  onKeyUp = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = false
  }
  close() {
    this.status = 'end'
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }
  registerAction(key: string, callback: () => void) {
    this.actions[key] = callback
  }
  frameLoop = () => {
    //执行按键action
    for (let key in this.keydowns) {
      if (this.keydowns[key]) {
        if (this.actions[key]) this.actions[key]()
      }
    }
    this.update()
    this.clearCanvas()
    this.drawCanvas()
    if (this.status === 'end') return
    //next frame
    requestAnimationFrame(this.frameLoop)
  }
  update() {
    this.ball.move()
    if (this.paddle.collide(this.ball)) {
      //如果上一帧也是被碰撞，下一帧就不改变球的运动方向
      if (!this.ball.lastBump) {
        this.ball.reboundY()
      }
      this.ball.lastBump = true
    } else {
      this.ball.lastBump = false
    }
    this.blocks.forEach(block => {
      if (block.collide(this.ball)) {
        this.ball.reboundY()
        block.kill()
      }
    })
    this.blocks = this.blocks.filter(b => b.alive)
  }
  drawCanvas() {
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
  //擦除画板
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}

export default class BallGameGraph extends PureComponent {
  divRef = createRef<HTMLDivElement>()
  game: BallGame | null = null
  componentDidMount() {
    const div = this.divRef.current!
    this.game = new BallGame(div)
  }
  componentWillUnmount() {
    this.game?.close()
  }
  onCloseClick = () => {
    this.game?.close()
  }
  render() {
    return (
      <div style={{ padding: '30px' }}>
        <div ref={this.divRef} />
        <Button onClick={this.onCloseClick}>CLOSE</Button>
      </div>
    )
  }
}