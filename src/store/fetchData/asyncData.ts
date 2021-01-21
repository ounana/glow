export default 2
// import {
// 	GET_ASYNC_DATA,
// 	ASYNC_SUCCESS,
// 	ASYNC_FAIL,
// 	loadData,
// 	AsyncDataAction,
// 	GetAsyncData,
// 	AsyncSuccess
// } from './actions'

// export type MusicList = {
// 	pending: boolean
// 	result: string[]
// }

// const initAsyncData: MusicList = {
// 	pending: false,
// 	result: []
// }

// export function musicList(state = initAsyncData, action: AsyncDataAction): MusicList {
// 	const { type, ...rest } = action
// 	switch (action.type) {
// 		case ASYNC_SUCCESS:
// 			return { ...state, pending: false, result: (rest as AsyncSuccess).result }
// 		case ASYNC_FAIL:
// 			return { ...state, pending: false }
// 		case GET_ASYNC_DATA:
// 			loadData((rest as GetAsyncData).params)
// 			return { ...state, pending: true }
// 		default:
// 			return state
// 	}
// }