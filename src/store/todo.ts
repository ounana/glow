import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface TodoOpt {
  id: number
  text: string
  completed: boolean
}

export type TodoFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'

export interface Todo {
  data: TodoOpt[]
  filter: TodoFilter
}

const initialState = {
  data: [],
  filter: 'SHOW_ALL'
} as Todo

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TodoOpt>) => {
      state.data = [...state.data, action.payload]
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      state.data = state.data.map(todo =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      )
    },
    switchTodoFilter: (state, action: PayloadAction<TodoFilter>) => {
      state.filter = action.payload
    }
  }
})

export const { addTodo, toggleTodo, switchTodoFilter } = todoSlice.actions

export default todoSlice.reducer