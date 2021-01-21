import { ToDo } from "./todo";

//添加todo
export type AddToDo = {
  type: string
  todo: ToDo
}
export const ADD_TODO: string = 'ADD_TODO'
let nextTodoId: number = 0
export function addTodo(text: string): AddToDo {
  return {
    type: ADD_TODO,
    todo: { text, id: nextTodoId++, completed: false }
  }
}

//切换todo
export type ToggleToDo = {
  type: string
  id: number
}
export const TOGGLE_TODO: string = 'TOGGLE_TODO'
export function toggleTodo(id: number): ToggleToDo {
  return { type: TOGGLE_TODO, id }
}



//过滤todo
export const SHOW_ALL = 'SHOW_ALL'
export const SHOW_COMPLETED = 'SHOW_COMPLETED'
export const SHOW_ACTIVE = 'SHOW_ACTIVE'
export type Filter = typeof SHOW_ALL | typeof SHOW_COMPLETED | typeof SHOW_ACTIVE

export type UpdateTodoFilter = {
  type: string
  filter: Filter
}

export const UPDATE_TODO_FILTER: string = 'UPDATE_TODO_FILTER'
export function updateTodoFilter(filter: Filter): UpdateTodoFilter {
  return { type: UPDATE_TODO_FILTER, filter }
}

//todo action类型
export type ToDoAction = AddToDo & ToggleToDo & UpdateTodoFilter