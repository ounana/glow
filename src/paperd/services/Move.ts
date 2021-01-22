import { PaperScope } from "paper";
import { Service } from ".";

export class Move implements Service {
  static namespace = 'move'
  path: null | paper.Path = null
  segment: paper.Segment | null = null
  hoverPath: paper.Path | null = null
  hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 5
  }
  constructor(public readonly paper: PaperScope) {
    this.paper.view.on('mousemove', this.onMouseMove)
    this.paper.view.on('mousedrag', this.onMouseDrag)
    this.paper.view.on('mousedown', this.onMouseDown)
  }

  onMouseMove = (event: any) => {
    const { point } = event
    const hitResult = this.paper.project!.hitTest(point, this.hitOptions) || {}
    const { item: hitPath } = hitResult
    if (hitPath) {
      if (this.hoverPath && this.hoverPath.id !== hitPath.id) {
        this.hoverPath.selected = false
      }
      this.hoverPath = hitPath as paper.Path
      hitPath.selected = true
    } else {
      if (this.hoverPath && this.hoverPath.selected) {
        this.hoverPath.selected = false
      }
    }
  }

  onMouseDrag = (event: any) => {
    const { delta } = event
    if (this.segment) {
      this.segment.point = this.segment.point!.add(delta)
      this.path!.smooth()
    } else if (this.path) {
      this.path.position = this.path.position!.add(delta)
    }
  }
  onMouseDown = (event: any) => {
    this.path = this.segment = null
    const { point } = event
    const hitResult = this.paper.project!.hitTest(point, this.hitOptions)
    if (!hitResult) return
    this.path = hitResult.item as paper.Path
    const { type } = hitResult
    if (type === 'segment') {
      this.segment = hitResult.segment
    }
    if (type === 'stroke') {
      const location = hitResult.location
      this.segment = this.path!.insert(location!.index + 1, point)
    }
    if (type === 'fill') {
      this.paper.project!.activeLayer.addChild(hitResult.item!);
    }
  }
  destroy(): void {
    this.paper.view.off('mousemove', this.onMouseMove)
    this.paper.view.off('mousedrag', this.onMouseDrag)
    this.paper.view.off('mousedown', this.onMouseDown)
  }
}
