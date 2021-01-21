import { ToDo } from "./todo";
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE, Filter } from "./actions";

export function getterTodos(todos: ToDo[], filter: Filter) {
  switch (filter) {
    case SHOW_ALL:
      return todos
    case SHOW_COMPLETED:
      return todos.filter(t => t.completed)
    case SHOW_ACTIVE:
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}