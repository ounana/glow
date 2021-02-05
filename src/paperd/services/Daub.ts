import { Service } from ".";

// import store from "../../store";
// import { addPath, removePath } from "../../store/paper/actions";

export class Daub implements Service {
  static namespace = 'daub'
  oldPath: paper.Path | null = null
  newPath: paper.Path | null = null
  circle: paper.Path.Circle
  hitOptions = {
    fill: true,
    class: this.paper.Path,
    tolerance: 30
  }
  constructor(public readonly paper: paper.PaperScope) {
    this.circle = new paper.Path.Circle({
      center: [80, 50],
      radius: 30,
      strokeColor: 'black'
    })

    this.paper.view.on('mouseup', this.onMouseUp)
    this.paper.view.on('mousemove', this.onMouseMove)
    this.paper.view.on('mousedrag', this.onMouseDrag)
  }
  onMouseUp = (event: any) => {
    //保存path
    if (this.oldPath && this.newPath) {
      //删除老的 
      // store.dispatch(removePath(this.oldPath.id))
      //保存新的
      // store.dispatch(addPath(this.newPath))
      this.oldPath = this.newPath = null
    }
  }
  onMouseMove = (event: any) => {
    this.circle.position = event.point
  }
  onMouseDrag = (event: any) => {
    const { point } = event
    this.circle.position = point

    const hitResult = this.paper.project!.hitTest(point, this.hitOptions) || {}
    const { item: hitPath } = hitResult
    if (hitPath) {
      //判断相交
      if (hitPath.intersects(this.circle)) {
        if (!this.oldPath) {
          this.oldPath = hitPath as paper.Path
        }
        this.newPath = (hitPath as any).unite(this.circle)
        hitPath.remove()
        this.paper.project!.activeLayer.addChild(this.newPath!)
      }
    }
  }

  destroy(): void {
    this.paper.view.off('mouseup', this.onMouseUp)
    this.paper.view.off('mousemove', this.onMouseMove)
    this.paper.view.off('mousedrag', this.onMouseDrag)
    this.circle.remove()
  }
}