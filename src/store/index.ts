import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { todo, ToDoState } from './todo/todo'
import { paperStore, PaperStore } from './paper/paperStore'

const rootState = combineReducers<State>({
  todo,
  paperStore
})

export type State = {
  todo: ToDoState,
  paperStore: PaperStore
}

const store = createStore(rootState)
export default store