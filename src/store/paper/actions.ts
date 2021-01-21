/* 新增 */
export const ADD_PATH = 'ADD_PATH'
export type AddPath = {
  type: typeof ADD_PATH
  path: any
}
export function addPath(path: any): AddPath {
  return { type: ADD_PATH, path }
}

/* 删除 */
export const REMOVE_PATH = 'REMOVE_PATH'
export type RemovePath = {
  type: typeof REMOVE_PATH
  id: number
}

export function removePath(id: number): RemovePath {
  return { type: REMOVE_PATH, id }
}

/* 显隐 */
export const TOGGLE_PATH = 'TOGGLE_PATH'
export type TogglePath = {
  type: typeof TOGGLE_PATH,
  id: number,
  visible: boolean
}
export function togglePath(id: number, visible: boolean): TogglePath {
  return { type: TOGGLE_PATH, id, visible }
}

export type PathStoreAction = AddPath | RemovePath | TogglePath