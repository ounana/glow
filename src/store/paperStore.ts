import { Action, ACTION } from './actions';

export type PaperStore = {
  path: PaperPath[]
}

export interface PaperPath {
  id: number,
  visible: boolean
}

const initPaperStore: PaperStore = {
  path: []
}

export function paperStore(state = initPaperStore, action: Action): PaperStore {
  switch (action.type) {
    case ACTION.ADD_PAPER_PATH:
      return { ...state, path: [...state.path, action.payload] }
    case ACTION.REMOVE_PAPER_PATH:
      return { ...state, path: state.path.filter(p => p.id !== action.payload) }
    case ACTION.TOGGLE_PAPER_PATH:
      return {
        ...state, path: state.path.map(p =>
          p.id === action.payload ? { ...p, visible: !p.visible } : p
        )
      }
    default:
      return state
  }
}