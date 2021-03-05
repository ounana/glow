import G6, { Graph, IG6GraphEvent, INode, IGroup } from '@antv/g6'
import { ShapeAttrs } from '@antv/g-base'

const nodeDefault = {
  stateStroke: 'red',
  stroke: '#444'
}

function getLinkPoints(width: number, height: number, group: IGroup): IGroup {
  const shapeAttrs: ShapeAttrs = { r: 4, stroke: nodeDefault.stateStroke, fill: 'white' }
  const points = [
    [0, - height / 2],
    [0, height / 2],
    [-width / 2, 0],
    [width / 2, 0]
  ]
  const linkPoints = group.addGroup()
  points.forEach(p => {
    linkPoints.addShape('circle', {
      attrs: { x: p[0], y: p[1], ...shapeAttrs }
    })
  })
  return linkPoints
}

G6.registerNode('irect', {
  draw: (cfg, group) => {
    const { size } = cfg!
    if (!Array.isArray(size)) throw new Error('size 不存在')
    const g = group!.addGroup()
    const fanIn = g.addShape('rect', {
      attrs: {
        fill: 'white',
        stroke: nodeDefault.stroke,
        width: size[0],
        height: size[1],
        x: -size[0] / 2,
        y: -size[1] / 2
      },
      name: 'irect-box',
      draggable: true
    })
    g.addShape('text', {
      attrs: {
        fill: nodeDefault.stroke,
        x: 0,
        y: 0,
        text: '测试',
        textAlign: 'center',
        textBaseline: 'middle',
        fontSize: 16
      },
      name: 'irect-text',
      draggable: true
    })
    const linkPointShapes = getLinkPoints(size[0], size[1], group!)
    linkPointShapes.hide()
    return fanIn
  },
  setState(name, value, item) {
    const group = item!.getContainer()
    const linkPoints: IGroup = group.get('children')[1]
    if (name === 'selected') {
      if (value) {
        linkPoints.show()
      } else {
        linkPoints.hide()
      }
    }
  }
})

G6.registerBehavior('select-item', {
  getDefaultCfg() {
    return {
      multiple: false
    };
  },
  getEvents() {
    return {
      'edge:click': 'onItemClick',
      'node:click': 'onItemClick',
      'canvas:click': 'onCanvasClick'
    }
  },
  onItemClick(e: IG6GraphEvent) {
    const graph: Graph = this.graph as any
    const item = e.item!;
    //清空掉所有item的选中状态
    (this as any).removeState()
    if (item.hasState('selected')) {
      graph.setItemState(item, 'selected', false);
      return;
    }
    // 置点击的item状态 'selected' 为 true
    graph.setItemState(item, 'selected', true);
  },
  onCanvasClick(e: any) {
    (this as any).removeState()
  },
  removeState() {
    const graph: Graph = this.graph as any
    graph.findAllByState('node', 'selected').forEach(node => {
      graph.setItemState(node, 'selected', false)
    })
    graph.findAllByState('edge', 'selected').forEach(edge => {
      graph.setItemState(edge, 'selected', false)
    })
  }
})

interface RegisterBehaviorThis {
  graph: Graph
  edge: any | null
  addingEdge: boolean
}

G6.registerBehavior('click-add-edge', {
  getEvents() {
    return {
      'node:click': 'onClick',
      'mousemove': 'onMousemove',
      'edge:click': 'onEdgeClick',
    };
  },
  onClick(this: RegisterBehaviorThis, ev: IG6GraphEvent) {
    const node = ev.item as INode
    const graph = this.graph
    // 鼠标当前点击的节点的位置
    const point = { x: ev.x, y: ev.y }
    const nodeModel = node.getModel()
    if (this.addingEdge && this.edge) {
      //结束逻辑
      const source = this.edge.getSource().getModel()
      //首位相同的线排除
      if (source.id === nodeModel.id) {
        return
      }
      //重叠的线 排除
      const iscoin = graph.getEdges().filter(e => typeof e.getModel().target === 'string')
        .map(e => e.getSource().getID() + e.getTarget().getID())
        .find(x => x === source.id + nodeModel.id)
      if (iscoin) {
        return
      }
      graph.updateItem(this.edge, {
        target: nodeModel.id
      })
      graph.emit('aftercreateedge', this.edge)
      this.edge = null
      this.addingEdge = false
    } else {
      //起点
      // 在图上新增一条边，结束点是鼠标当前点击的节点的位置
      this.edge = graph.addItem('edge', {
        // id: v4(),
        source: nodeModel.id,
        target: point
      })
      this.addingEdge = true
    }
  },
  onMousemove(this: RegisterBehaviorThis, ev: IG6GraphEvent) {
    const graph = this.graph
    // 鼠标的当前位置
    const point = { x: ev.x, y: ev.y }
    if (this.addingEdge && this.edge) {
      // 更新边的结束点位置为当前鼠标位置
      graph.updateItem(this.edge, {
        target: point,
      })
    }
  },
  onEdgeClick(this: RegisterBehaviorThis, ev: IG6GraphEvent) {
    const currentEdge = ev.item;
    // 拖拽过程中，点击会点击到新增的边上
    if (this.addingEdge && this.edge === currentEdge) {
      this.graph.removeItem(this.edge);
      this.edge = null;
      this.addingEdge = false;
    }
  },
})
