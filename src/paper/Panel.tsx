// import { Checkbox } from 'antd'
// import { togglePath } from '../store/paper/actions';

function Panel(props: any) {
  // const { paperStore: { pathStore }, dispatch } = props
  // console.log(pathStore)
  return (
    <div style={style.con}>
      显示当前元素数据
      {/* {pathStore.map((p: any, k: any) =>
        <div key={k} style={{
          backgroundColor: p.style.fillColor.toCanvasStyle(), ...style.div
        }}>
          <Checkbox checked={p.visible} onChange={v => dispatch(togglePath(p.id, v.target.checked))} />
          {p.id}
        </div>
      )} */}
    </div>
  )
}
export default Panel
const style: { [key: string]: React.CSSProperties } = {
  con: {
    padding: 10,
    cursor: 'pointer'
  },
  div: {
    margin: '5px 0'
  }
}