import { Button, List } from 'antd'
import { useAppDispatch, useAppSelector } from '../store'
import { loadData } from '../store/music'

export default function LoadData() {
  const { data, pending } = useAppSelector((state) => state.music)
  const dispatch = useAppDispatch()
  const onLoadClick = () => {
    dispatch(loadData('music'))
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