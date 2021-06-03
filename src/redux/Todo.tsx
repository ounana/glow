import { Input, List, Radio } from 'antd'
import { RadioChangeEvent } from 'antd/lib/radio';
import { TodoFilter, addTodo, toggleTodo, switchTodoFilter } from '../store/todo';
import { useAppDispatch, useAppSelector } from '../store'

let todoId = 0

export default function Todo() {
  const { data, filter } = useAppSelector((state) => state.todo)
  const dispatch = useAppDispatch()

  const onSearch = (v: string) => {
    if (!v.trim()) return
    const todo = { id: todoId++, text: v, completed: false }
    dispatch(addTodo(todo))
  }

  const onTodoClick = (id: number) => {
    dispatch(toggleTodo(id))
  }

  const onRadioChange = (e: RadioChangeEvent) => {
    const filter = e.target.value as TodoFilter
    dispatch(switchTodoFilter(filter))
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
