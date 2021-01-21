import { ADD_PATH, REMOVE_PATH, TOGGLE_PATH } from './actions';

export type PaperStore = {
  pathStore: any[]
}

const initPathStore: PaperStore = {
  pathStore: []
}

export function paperStore(state = initPathStore, action: any): PaperStore {
  const { type } = action as any
  switch (type) {
    case ADD_PATH:
      return { ...state, pathStore: [...state.pathStore, action.path] }
    case REMOVE_PATH:
      return state
    case TOGGLE_PATH:
      let path = state.pathStore.find(p => p.id === action.id)
      if (path) {
        path.visible = action.visible
      }
      return { ...state }
    default:
      return state
  }
}