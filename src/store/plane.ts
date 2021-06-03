import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Plane {
  editorType: string
  paths: any[]
}

const initialState = {
  editorType: 'draw',
  paths: []
} as Plane

export const planeSlice = createSlice({
  name: 'plane',
  initialState,
  reducers: {
    switchEditorType: (state, action: PayloadAction<string>) => {
      state.editorType = action.payload
    }
  }
})

export const { switchEditorType } = planeSlice.actions

export default planeSlice.reducer