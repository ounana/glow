import { createRef, PureComponent } from "react";
import { DuckShooter } from "./DuckShooter";

export default class DuckShooterGraph extends PureComponent {
  divRef = createRef<HTMLDivElement>()
  game: DuckShooter | null = null
  componentDidMount() {
    const div = this.divRef.current!
    this.game = new DuckShooter(div)
  }
  componentWillUnmount() {
    this.game?.close()
  }
  render() {
    return (
      <div
        ref={this.divRef}
        style={{
          background: '#fff', width: '100vw',
          height: '100vh', textAlign: 'center'
        }}>
      </div>
    )
  }
}