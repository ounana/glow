import { Input, List, Radio } from 'antd'
import { connect, DispatchProp } from 'react-redux'
import { State } from '../store';
import { Action, ACTION } from '../store/actions';
import { RadioChangeEvent } from 'antd/lib/radio';
import { TodoFilter } from '../store/todo';

let todoId = 0
interface TodoProps extends ReturnType<typeof mapstate>, DispatchProp<Action> { }

function Todo(props: TodoProps) {
  const { todo: { data, filter }, dispatch } = props
  const onSearch = (v: string) => {
    if (!v.trim()) return
    const todo = { id: todoId++, text: v, completed: false }
    dispatch({ type: ACTION.ADD_TODO, payload: todo })
  }
  const onTodoClick = (id: number) => {
    dispatch({ type: ACTION.TOGGLE_TODO, payload: 2 })
    dispatch({ type: ACTION.TOGGLE_TODO, payload: id })
  }
  const onRadioChange = (e: RadioChangeEvent) => {
    const filter = e.target.value
    dispatch({ type: ACTION.SWITCH_TODO_FILTER, payload: filter })
  }
  const filterTodo = (filter: TodoFilter) => {
    switch (filter) {
      case 'SHOW_COMPLETED':
        return data.filter(td => td.completed)
      case 'SHOW_ACTIVE':
        return data.filter(td => !td.completed)
      default:
        return data
    }
  }
  return (
    <div>
      <Input.Search
        placeholder="input todo"
        enterButton="Add Todo"
        size="large"
        onSearch={onSearch}
      />
      <List
        bordered
        dataSource={filterTodo(filter)}
        renderItem={(v) =>
          <List.Item
            onClick={() => onTodoClick(v.id)}
            style={{ color: v.completed ? 'red' : 'green', cursor: 'pointer' }}
          >{v.text}</List.Item>
        }
      />
      <Radio.Group
        defaultValue={filter}
        onChange={onRadioChange}
        buttonStyle="solid"
      >
        <Radio.Button value="SHOW_ALL">SHOW_ALL</Radio.Button>
        <Radio.Button value="SHOW_COMPLETED">SHOW_COMPLETED</Radio.Button>
        <Radio.Button value="SHOW_ACTIVE">SHOW_ACTIVE</Radio.Button>
      </Radio.Group>
    </div>
  )
}

const mapstate = (state: State) => ({
  todo: state.todo
})

export default connect(mapstate)(Todo)