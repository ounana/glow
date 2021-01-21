import { Service } from ".";
import { MyPaperScope } from "../PaperRoot";

export class Union implements Service {
  static namespace = 'union'
  path: null | paper.Path = null
  hitOptions = {
    // segments: true,
    // stroke: true,
    fill: true,
    tolerance: 5
  }
  constructor(public readonly paper: MyPaperScope) {
    this.paper.view.on('mousemove', this.onMouseMove)
    this.paper.view.on('mousedrag', this.onMouseDrag)
    this.paper.view.on('mousedown', this.onMouseDown)
  }

  onMouseMove = (event: any) => {

  }

  onMouseDrag = (event: any) => {
    const { delta } = event
    if (this.path) {
      this.path.position = this.path.position!.add(delta)
    }
  }
  onMouseDown = (event: any) => {
    const { point } = event
    const hitResult = this.paper.project!.hitTest(point, this.hitOptions) || {}
    const { item } = hitResult
    this.path = item as paper.Path | null
    console.log(this.path)
  }
  destroy(): void {
    this.paper.view.off('mousemove', this.onMouseMove)
    this.paper.view.off('mousedrag', this.onMouseDrag)
    this.paper.view.off('mousedown', this.onMouseDown)
  }
}