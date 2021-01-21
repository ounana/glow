import {
  ADD_TODO,
  TOGGLE_TODO,
  ToDoAction,
  Filter,
  SHOW_ALL,
  UPDATE_TODO_FILTER
} from './actions'

export type ToDo = {
  id: number
  text: string
  completed: boolean
}
export type ToDoState = {
  todos: ToDo[]
  filter: Filter
}

const initToDoState: ToDoState = {
  todos: [],
  filter: SHOW_ALL
}

export function todo(state = initToDoState, action: ToDoAction): ToDoState {
  switch (action.type) {
    case UPDATE_TODO_FILTER:
      return { ...state, filter: action.filter }
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(
          todo => todo.id === action.id ?
            { ...todo, completed: !todo.completed }
            : todo
        )
      }
    default:
      return state
  }
}