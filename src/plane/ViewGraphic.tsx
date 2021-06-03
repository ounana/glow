import { createRef, PureComponent } from 'react'
import * as paper from 'paper'
import { ServiceCore } from './services';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import Left from './Left';
import Right from './Right';
import { connect } from 'react-redux'
import { RootState } from '../store';

interface ViewGraphicProps {
  height: number | string
  plane?: RootState['plane']
}

class ViewGraphic extends PureComponent<ViewGraphicProps> {
  ref = createRef<HTMLDivElement>()
  paper: paper.PaperScope
  serviceCore: ServiceCore
  resizePaperSub: Subscription | null = null

  constructor(props: ViewGraphicProps) {
    super(props)
    this.paper = new paper.PaperScope()
    this.serviceCore = new ServiceCore(this.paper)
  }

  componentWillUnmount() {
    this.resizePaperSub?.unsubscribe()
  }

  componentDidMount() {
    const ref = this.ref.current
    if (!ref) return
    const canvas = document.createElement('canvas')
    ref.appendChild(canvas)

    this.paper.setup(canvas)
    this.serviceCore.registerService('draw')

    const size = ref.getBoundingClientRect()
    this.paper.view.viewSize = new this.paper.Size(
      size.width, size.height
    )
    const observable = fromEvent(window, 'resize').pipe(
      debounceTime(300),
      map(() => ref.getBoundingClientRect())
    )
    this.resizePaperSub = observable.subscribe(e => {
      this.paper.view.viewSize = new this.paper.Size(e.width, e.height)
    })
  }

  componentDidUpdate() {
    if (!this.serviceCore) return
    this.serviceCore.registerService(this.props.plane?.editorType!)
  }

  render() {
    const { height } = this.props
    return (
      <div style={{ height, display: 'flex' }}>
        <Left width={200} />
        <div
          style={{ width: 'calc(100% - 400px)', border: '1px solid' }}
          ref={this.ref}
        />
        <Right width={200} />
      </div>
    )
  }
}

const mapstate = (state: RootState) => ({ plane: state.plane })

export default connect(mapstate)(ViewGraphic)