import { loadImages, Images, SOUNDS } from './source'
import Utils from './utils'

interface Rect {
  x: number
  y: number
  width: number
  height: number
}
/**
 * 鸭子
 */
class Duck implements Rect {
  id = Date.now() + Math.random()
  x = 0
  y = 0
  width = 200
  height = 200
  direction: 0 | 1 = 0 //是否水平翻转渲染
  type: 1 | 2 | 3 | 4 = 1 //鸭子图片类型
  liveProgress = 0 //活着画面进度 0 - 7
  livePosition = [
    [0, 0], [200, 0], [400, 0], [600, 0],
    [800, 0], [1000, 0], [1200, 0], [1400, 0]
  ]
  deadProgress = 0 //死亡画面进度 0 - 36
  deadPosition = [
    [1600, 0],
    [0, 200], [200, 200], [400, 200], [600, 200], [800, 200], [1000, 200], [1200, 200], [1400, 200], [1600, 200],
    [0, 400], [200, 400], [400, 400], [600, 400], [800, 400], [1000, 400], [1200, 400], [1400, 400], [1600, 400],
    [0, 600], [200, 600], [400, 600], [600, 600], [800, 600], [1000, 600], [1200, 600], [1400, 600], [1600, 600],
    [0, 800], [200, 800], [400, 800], [600, 800], [800, 800], [1000, 800], [1200, 800], [1400, 800], [1600, 800],
  ]
  speedX = Math.random() * 4
  speedY = Math.random() * 4
  invalid = false // 超出边界
  dead = false // 击中死亡
  constructor(public canvasWidth: number, public canvasHeight: number) {
    //初始化方位
    this.direction = ~~(Math.random() * 2) as 0 | 1
    //初始化位置 朝左的右半场 反之左半场
    const maxX = canvasWidth - this.width
    this.x = (maxX / 2) * Math.random() + (maxX / 2)
    this.y = canvasHeight - this.height * 2
    //初始化鸭子类型
    this.type = ~~(Math.random() * 4) + 1 as 1 | 2 | 3 | 4
  }
  //以鸭子中心，取n*n的矩形
  getCenterBox(n: number): Rect {
    let { x, y } = this
    if (this.direction) {
      x = this.getDirectionX()
    }
    const center = [x + this.width / 2, y + this.height / 2]
    return { x: center[0] - n / 2, y: center[1] - n / 2, width: n, height: n }
  }
  //水平翻转后，鸭子的实际x坐标
  getDirectionX() {
    return (this.canvasWidth / 2) - (this.x + this.width - (this.canvasWidth / 2))
  }
  updateDead() {
    this.dead = true
    //播放死亡音频
    Utils.instance.playAudio(SOUNDS.DS_DUCK_HIT)
  }
  move() {
    if (this.dead) {
      this.y += 6
    } else {
      this.x -= this.speedX
      this.y -= this.speedY
    }
    //判定 鸭子是否超出边界
    if (
      this.x < 0 - this.width || this.y < 0 - this.height || this.y > this.canvasHeight
    ) {
      this.invalid = true
    }
  }
  update() {
    if (this.dead) {
      this.updateDeadProgress()
    } else {
      this.updateLiveProgress()
    }
    this.move()
  }
  updateDeadProgress() {
    let nextProgress = this.deadProgress + 1
    nextProgress = nextProgress > 36 ? 36 : nextProgress
    this.deadProgress = nextProgress
  }
  updateLiveProgress() {
    let nextProgress = this.liveProgress + 1
    nextProgress = nextProgress > 7 ? 0 : nextProgress
    this.liveProgress = nextProgress
  }
}

/**
 * 枪镜头
 */
class GunLens implements Rect {
  x = 0
  y = 0
  width = 150
  height = 150
  speed = 10
  fireProgress = 24 //开火进度 0 - 24
  firePosition = [ //开火图片定位
    [0, 0], [200, 0], [400, 0], [600, 0], [800, 0],
    [0, 200], [200, 200], [400, 200], [600, 200], [800, 200],
    [0, 400], [200, 400], [400, 400], [600, 400], [800, 400],
    [0, 600], [200, 600], [400, 600], [600, 600], [800, 600],
    [0, 800], [200, 800], [400, 800], [600, 800], [800, 800]
  ]
  fireing = false //开火状态
  constructor(public canvasWidth: number, public canvasHeight: number) { }
  updateFireProgress() {
    let nextProgress = this.fireProgress + 1
    if (nextProgress > 24) {
      nextProgress = 24
      this.fireing = false
    }
    this.fireProgress = nextProgress
  }
  //以镜头中心，取n*n的矩形
  getCenterBox(n: number): Rect {
    const center = [this.x + this.width / 2, this.y + this.height / 2]
    return { x: center[0] - n / 2, y: center[1] - n / 2, width: n, height: n }
  }
  fired(ducks: Duck[]) {
    this.fireing = true
    this.fireProgress = 0
    Utils.instance.playAudio(SOUNDS.DS_SHOT)
    //判定是否击中鸭子
    ducks.forEach(duck => {
      const a = this.getCenterBox(10)
      const b = duck.getCenterBox(100)
      if (this.collide(a, b)) {
        duck.updateDead()
      }
    })
  }
  collide(a: Rect, b: Rect) {
    //两个矩形中心点 x轴距离 <= 两个矩形宽和的一半 &&
    //两个矩形中心点 y轴距离 <= 两个矩形高和的一半
    const cond1 = [a.x + a.width / 2, a.y + a.height / 2]
    const cond2 = [b.x + b.width / 2, b.y + b.height / 2]
    const cx = Math.abs(cond1[0] - cond2[0])
    const cy = Math.abs(cond1[1] - cond2[1])
    if (cx <= (a.width + b.width) / 2 && cy <= (a.height + b.height) / 2) {
      return true
    }
    return false
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
  moveTop() {
    let nextY = this.y - this.speed
    if (nextY < 0) nextY = 0
    this.y = nextY
  }
  moveBottom() {
    let nextY = this.y + this.speed
    if (nextY > this.canvasHeight - this.height) nextY = this.canvasHeight - this.height
    this.y = nextY
  }
}
/**
 * 鸭子射手
 */
export class DuckShooter {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  width: number
  height: number
  images: Images = {}
  keydowns: { [key: string]: boolean } = {}
  gunLens: GunLens
  ducks: Duck[] = []
  suspend = false
  constructor(public root: HTMLDivElement) {
    const { canvas, ctx } = this.createCanvas()
    this.canvas = canvas
    this.ctx = ctx
    root.appendChild(this.canvas)
    const { width, height } = this.getCanvasSize()
    this.canvas.width = width
    this.canvas.height = height
    this.width = width
    this.height = height
    this.gunLens = new GunLens(this.width, this.height)
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
    this.setup()
  }

  createCanvas() {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.style.border = '1px solid'
    return { canvas, ctx }
  }

  getCanvasSize() {
    const rootRect = this.root.getBoundingClientRect()
    this.canvas.height = rootRect.height
    let width = rootRect.height * 1.3
    width = width > rootRect.width ? rootRect.width : width
    return { width, height: rootRect.height }
  }

  close() {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  keyDownHandle(evt: KeyboardEvent) {
    switch (evt.code) {
      case 'Space':
        evt.preventDefault()
        this.gunLens.fired(this.ducks)
        return
      case 'KeyG':
        //生成鸭子
        this.generateDuck()
        return
      case 'KeyX':
        this.switchSuspend()
        return
      default:
    }
  }

  switchSuspend() {
    this.suspend = !this.suspend
    if (!this.suspend) {
      requestAnimationFrame(this.render)
    }
  }

  generateDuck() {
    //一次创建 1 ～ 2 只鸭子
    const duckCount = ~~(Math.random() * 2) + 1
    for (let i = 0; i < duckCount; i++) {
      const duck = new Duck(this.width, this.height)
      this.ducks.push(duck)
    }
  }

  onKeyDown = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = true
    this.keyDownHandle(evt)
  }

  onKeyUp = (evt: KeyboardEvent) => {
    this.keydowns[evt.key] = false
  }

  async setup() {
    //加载图片数据
    this.images = await loadImages()
    this.render()
  }

  render = () => {
    this.update()
    this.clearCanvas()
    this.draw()
    if (!this.suspend) requestAnimationFrame(this.render)
  }

  draw() {
    this.drawGunLens()
    this.drawDuck()
  }

  drawDuck() {
    this.ducks.forEach(duck => {
      let key = 'DUCK_' + duck.type
      const image = this.images[key]
      const duckmap = duck.dead ? duck.deadPosition[duck.deadProgress] : duck.livePosition[duck.liveProgress]
      const { width, height } = duck
      this.ctx.save()
      if (duck.direction) {
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.width, 0)
      }
      this.ctx.drawImage(image, duckmap[0], duckmap[1], width, height, duck.x, duck.y, width, height)
      this.ctx.restore()
    })
  }

  update() {
    //更新按键操作
    this.checkKeydowns()
    //更新开火进度
    if (this.gunLens.fireing) {
      this.gunLens.updateFireProgress()
    }
    //更新鸭子飞行状态
    this.ducks.forEach(duck => duck.update())
    //删除无效的鸭子
    this.ducks = this.ducks.filter(d => !d.invalid)
  }

  checkKeydowns() {
    Object.keys(this.keydowns).forEach(key => {
      if (!this.keydowns[key]) return
      switch (key) {
        case 'a':
          return this.gunLens.moveLeft()
        case 'd':
          return this.gunLens.moveRight()
        case 'w':
          return this.gunLens.moveTop()
        case 's':
          return this.gunLens.moveBottom()
        default:
      }
    })
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  drawGunLens() {
    const { GUN_LENS, BLAST } = this.images
    this.ctx.drawImage(GUN_LENS, this.gunLens.x, this.gunLens.y, this.gunLens.width, this.gunLens.height)
    if (!this.gunLens.fireing) return
    const firemap = this.gunLens.firePosition[this.gunLens.fireProgress]
    this.ctx.drawImage(BLAST, firemap[0], firemap[1], 200, 200, this.gunLens.x - 25, this.gunLens.y - 25, 200, 200)
  }
}