import { Action, ACTION } from './actions'

export type TodoData = {
  id: number
  text: string
  completed: boolean
}
export type TodoFilter = 'SHOW_ALL' | 'SHOW_COMPLETED' | 'SHOW_ACTIVE'
export type Todo = {
  data: TodoData[]
  filter: TodoFilter
}
const initTodo: Todo = {
  data: [],
  filter: 'SHOW_ALL'
}

export function todo(state = initTodo, action: Action): Todo {
  switch (action.type) {
    case ACTION.ADD_TODO:
      return { ...state, data: [...state.data, action.payload] }
    case ACTION.TOGGLE_TODO:
      return {
        ...state, data: state.data.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        )
      }
    case ACTION.SWITCH_TODO_FILTER:
      return { ...state, filter: action.payload }
    default:
      return state
  }
}