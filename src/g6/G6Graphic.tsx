import React, { PureComponent } from 'react';
import G6, { Graph, IG6GraphEvent } from '@antv/g6'
import './registerG6'

export default class G6Graphic extends PureComponent {
  nodeRef = React.createRef<HTMLDivElement>()
  graph: Graph | null = null
  getContextMenu = () => new G6.Menu({
    getContent(graph: any) {
      return `<ul>
        <li>修改01</li>
        <li>测试02</li>
      </ul>`;
    },
    handleMenuClick: (target: any, item: any) => {
      console.log(target, item);
    },
    offsetX: 0,
    offsetY: 0,
    itemTypes: ['node']
  })

  componentDidMount() {
    this.renderGraph()
  }

  fitCenter() {
    this.graph!.layout()
    this.graph!.fitCenter()
  }

  renderGraph = () => {
    const node = this.nodeRef.current!
    const [width, height] = [node.scrollWidth, node.scrollHeight]
    const grid = new G6.Grid()
    const contextMenu = this.getContextMenu()
    this.graph = new G6.Graph({
      plugins: [grid, contextMenu],
      container: node,
      width, height,
      modes: {
        default: [
          'drag-node',
          'select-item',
          'drag-canvas',
          'click-add-edge'
        ],
      },
      defaultNode: {
        anchorPoints: [
          [0.5, 0], [1, 0.5], [0.5, 1], [0, 0.5], [0.5, 0]
        ]
      },
      edgeStateStyles: {
        selected: {
          stroke: 'red'
        }
      },
      defaultEdge: {
        type: 'polyline',
        size: 2,
        style: {
          stroke: '#000',
          endArrow: true,
          lineAppendWidth: 8,
          offset: 20
        }
      },
      layout: {
        type: 'dagre',
        ranksep: 25
      }
    })

    this.graph.render()
    this.resizeGraph()
    this.graph.on('contextmenu', (e) => {
      e.originalEvent.preventDefault()
    })
    this.graph.on('canvas:click', this.onCanvasClick)
  }

  onCanvasClick(this: Graph, evt: IG6GraphEvent) {
    const id = 'node-' + Date.now().toString()
    const { x, y } = this.getPointByClient(evt.clientX, evt.clientY)
    this.addItem('node', {
      id, x, y, type: 'irect', size: [100, 50]
    })
  }

  remove = () => {
    if (!this.graph) return
    const selecteds = this.graph.findAllByState('edge', 'selected')
      .concat(this.graph.findAllByState('node', 'selected'))
    //线删除线 再删除节点
    selecteds.forEach(i => {
      this.graph!.removeItem(i.getID())
    })
  }

  resizeGraph = () => {
    const gridCon = document.querySelector<HTMLDivElement>('.g6-grid-container')
    if (gridCon) {
      gridCon.style.left = '0px'
      gridCon.style.top = '0px'
    }
  }

  render() {
    return (
      <div ref={this.nodeRef}
        style={{
          width: '800px', height: '600px', position: 'relative',
          border: '1px solid'
        }}
      />
    )
  }
}
