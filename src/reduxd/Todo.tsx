import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Input, List, Radio } from 'antd'
import { addTodo, toggleTodo, updateTodoFilter, Filter } from '../store/todo/actions'
import { getterTodos } from '../store/todo/getterTodos'
import { State } from '../store';

const mapstate = ({ todo }: State) => ({ todo })
export default connect(mapstate)(Todo)

function Todo(props: any) {
  const [value, setValue] = useState('')
  const { todo, dispatch } = props
  const { todos, filter } = todo
  return (
    <div>
      <Input.Search
        placeholder="input todo text"
        enterButton="Add ToDo"
        size="large"
        onSearch={v => {
          if (!v.trim()) return
          dispatch(addTodo(v))
          setValue('')
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <List
        bordered
        dataSource={getterTodos(todos, filter)}
        renderItem={v =>
          <List.Item
            onClick={() => dispatch(toggleTodo(v.id))}
            style={{ color: v.completed ? 'red' : 'green', cursor: 'pointer' }}
          >{v.text}</List.Item>
        }
      />
      <Radio.Group
        defaultValue={filter}
        onChange={e => dispatch(updateTodoFilter(e.target.value as Filter))}
        buttonStyle="solid">
        <Radio.Button value="SHOW_ALL">SHOW_ALL</Radio.Button>
        <Radio.Button value="SHOW_COMPLETED">SHOW_COMPLETED</Radio.Button>
        <Radio.Button value="SHOW_ACTIVE">SHOW_ACTIVE</Radio.Button>
      </Radio.Group>
    </div>
  )
}

