import { Button, List } from 'antd'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { State } from '../store'
import { ACTION, Action } from '../store/actions'

interface LoadDataProps extends ReturnType<typeof mapstate> {
  dispatch: Dispatch<Action>
}
function LoadData(props: LoadDataProps) {
  const { music: { data, pending }, dispatch } = props
  const onLoadClick = () => {
    dispatch({ type: ACTION.FETCH_DATA, payload: 'music' })
  }
  return (
    <div>
      <Button
        loading={pending}
        size="large"
        danger
        type="primary"
        onClick={onLoadClick}
      >LOAD DATA</Button>
      <List
        bordered
        dataSource={data}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
  )
}

const mapstate = (state: State) => ({
  music: state.music
})

export default connect(mapstate)(LoadData)