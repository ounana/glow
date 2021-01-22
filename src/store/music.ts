import store from '.'
import { Action, ACTION } from './actions'

export type Music = {
  pending: boolean
  data: string[]
}

const initMusic: Music = { pending: false, data: [] }
export function music(state = initMusic, action: Action): Music {
  switch (action.type) {
    case ACTION.FETCH_DATA_SUCCESS:
      return { ...state, pending: false, data: action.payload }
    case ACTION.FETCH_DATA_FAIL:
      return { ...state, pending: false }
    case ACTION.FETCH_DATA:
      loadData(action.payload)
      return { ...state, pending: true }
    default:
      return state
  }
}

export function loadData(params: string) {
  /* Simulate an asynchronous wait */
  setTimeout(async () => {
    try {
      const response = await fetch(
        process.env.REACT_APP_URL + '/data.json'
      ).then(res => res.json())
      store.dispatch({
        type: ACTION.FETCH_DATA_SUCCESS,
        payload: response[params]
      })
    } catch (err) {
      console.log(err)
      store.dispatch({ type: ACTION.FETCH_DATA_FAIL })
    }
  }, 1000)
}