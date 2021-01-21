import {
  UPDATE_TODO_FILTER, UpdateTodoFilter, SHOW_ALL, Filter
} from './actions'

const initToDoFilter: Filter = SHOW_ALL

export function todoFilter(state = initToDoFilter, action: UpdateTodoFilter): Filter {
  switch (action.type) {
    case UPDATE_TODO_FILTER:
      return action.filter
    default:
      return state
  }
}