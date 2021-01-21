import { Service } from ".";
import { MyPaperScope } from "../PaperRoot";
import store from "../../store";
import { addPath } from "../../store/paper/actions";

export class Draw implements Service {
  static namespace = 'draw'
  path: paper.Path | null = null
  start: paper.Point | null = null
  constructor(public paper: MyPaperScope) {
    this.paper.view.on('mouseup', this.onMouseUp)
    this.paper.view.on('mousedrag', this.onMouseDrag)
    this.paper.view.on('mousedown', this.onMouseDown)
    this.paper.view.element.style.cursor = 'crosshair'
  }
  onMouseUp = (e: any) => {
    if (!this.path || !this.start) return
    this.path.closed = true
    this.path.simplify()
    // this.path.smooth()
    store.dispatch(addPath(this.path))
  }
  onMouseDrag = (e: any) => {
    if (!this.path) return
    this.path.add(e.point)
  }
  onMouseDown = (e: any) => {
    this.path = new this.paper.Path()
    this.path.fillColor = new this.paper.Color({
      hue: Math.random() * 360,
      saturation: 1,
      brightness: 1
    })

    this.path.strokeColor = new this.paper.Color(0, 0, 0, 1)
    this.start = e.point
    this.path.add(e.point)
  }
  destroy(): void {
    this.paper.view.off('mouseup', this.onMouseUp)
    this.paper.view.off('mousedrag', this.onMouseDrag)
    this.paper.view.off('mousedown', this.onMouseDown)
    this.paper.view.element.style.cursor = 'auto'
  }
}
