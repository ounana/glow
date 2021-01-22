import { combineReducers } from 'redux'
import { createStore } from 'redux'
import { todo, Todo } from './todo'
import { Music, music } from './music'
import { Action } from './actions'
import { PaperStore, paperStore } from './paperStore'

const rootState = combineReducers<State, Action>({
  todo,
  music,
  paperStore
})

export type State = {
  todo: Todo,
  music: Music,
  paperStore: PaperStore
}

const store = createStore(rootState)
export default store