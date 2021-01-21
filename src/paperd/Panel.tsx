import React from 'react'
import { connect } from 'react-redux'
import { State } from '../store';
import { Checkbox } from 'antd'
import { togglePath } from '../store/paper/actions';

const mapstate = ({ paperStore }: State) => ({
  paperStore
})

export default connect(mapstate)((props: any) => {
  const { paperStore: { pathStore }, dispatch } = props
  console.log(pathStore)
  return (
    <div style={style.con}>
      {pathStore.map((p: any, k: any) =>
        <div key={k} style={{
          backgroundColor: p.style.fillColor.toCanvasStyle(), ...style.div
        }}>
          <Checkbox checked={p.visible} onChange={v => dispatch(togglePath(p.id, v.target.checked))} />
          {p.id}
        </div>
      )}
    </div>
  )
})

const style: { [key: string]: React.CSSProperties } = {
  con: {
    padding: 10,
    cursor: 'pointer'
  },
  div: {
    margin: '5px 0'
  }
}