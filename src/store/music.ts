import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '.'

export interface Music {
  data: string[]
  pending: boolean
}

const initialState: Music = {
  pending: false,
  data: []
}

export const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    fetchSuccess: (state, action: PayloadAction<string[]>) => {
      state.data = action.payload
      state.pending = false
    },
    fetchFail: (state) => {
      state.pending = false
    },
    fetchStart: (state) => {
      state.pending = true
    }
  }
})

export const { fetchSuccess, fetchFail, fetchStart } = musicSlice.actions

export default musicSlice.reducer

export function loadData(params: string) {
  return async function (dispatch: AppDispatch) {
    dispatch(fetchStart())
    setTimeout(async () => {
      try {
        let res = await fetch('./data.json').then(res => res.json())
        let res2 = res[params] as string[]
        dispatch(fetchSuccess(res2))
      } catch (err) {
        console.log(err)
        dispatch(fetchFail())
      }
    }, 1000)
  }
}