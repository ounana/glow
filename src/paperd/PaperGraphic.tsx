import { createRef, PureComponent } from 'react'
import { Row, Col, Radio } from 'antd'
import * as paper from 'paper'
import Panel from './Panel';
import { ServiceCore } from './services';
import { RadioChangeEvent } from 'antd/lib/radio';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

export default class PaperGraphic extends PureComponent {
  paperdom = createRef<HTMLDivElement>()
  paper: paper.PaperScope
  serviceCore: ServiceCore
  rePaperSub: Subscription | null = null
  constructor(props: {}) {
    super(props)
    this.paper = new paper.PaperScope()
    this.serviceCore = new ServiceCore(this.paper)
  }

  componentWillUnmount() {
    this.rePaperSub?.unsubscribe()
  }
  componentDidMount() {
    const paperdom = this.paperdom.current
    if (!paperdom) return
    const canvas = document.createElement('canvas')
    paperdom.appendChild(canvas)

    this.paper.setup(canvas)
    this.serviceCore.registerService('draw')

    const size = paperdom.getBoundingClientRect()
    this.paper.view.viewSize = new this.paper.Size(
      size.width, size.height
    )
    const observable = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(e => paperdom.getBoundingClientRect())
    )
    this.rePaperSub = observable.subscribe(e => {
      this.paper.view.viewSize = new this.paper.Size(e.width, e.height)
    })
  }

  onRadioChange = (e: RadioChangeEvent) => {
    if (!this.serviceCore) return
    this.serviceCore.registerService(e.target.value)
  }

  render() {
    return (
      <div>
        <Row>
          <Col
            span={18}
            style={{ border: '1px solid', height: 500 }}
            ref={this.paperdom}
          />
          <Col span={6}><Panel /></Col>
        </Row>
        <Radio.Group
          defaultValue="draw"
          buttonStyle="solid"
          onChange={this.onRadioChange}
        >
          <Radio.Button value="draw">勾画</Radio.Button>
          <Radio.Button value="move">移动</Radio.Button>
          <Radio.Button value="daub">涂抹</Radio.Button>
          <Radio.Button value="union">联合</Radio.Button>
          <Radio.Button value="hide">隐藏</Radio.Button>
          <Radio.Button value="show">显示</Radio.Button>
        </Radio.Group>
      </div>
    )
  }
}