export default 2
// import { service } from 'service/axios'
// import store from '../index'

// //发起请求
// export type GetAsyncData = {
// 	type: String
// 	params: {
// 		[key: string]: string
// 	}
// }
// export type GetAsyncDataParams = {
// 	[key: string]: string
// }
// export const GET_ASYNC_DATA = 'GET_ASYNC_DATA'
// export function getAsyncData(params: GetAsyncDataParams): GetAsyncData {
// 	return { type: GET_ASYNC_DATA, params }
// }
// //加载数据
// export async function loadData(params: GetAsyncDataParams) {
// 	try {
// 		const result: { list: string[] } = await service.get(
// 			'http://localhost:4000/data.json', { params }
// 		)
// 		const { list } = result
// 		store.dispatch(asyncSuccess(list))
// 	} catch (err) {
// 		store.dispatch(asyncFail())
// 	}
// }

// //请求成功
// export type AsyncSuccess = {
// 	type: string
// 	result: Array<string>
// }
// export const ASYNC_SUCCESS = 'ASYNC_SUCCESS'
// export function asyncSuccess(result: Array<string>): AsyncSuccess {
// 	return { type: ASYNC_SUCCESS, result }
// }

// //请求失败
// export type AsyncFail = {
// 	type: string
// }
// export const ASYNC_FAIL = 'ASYNC_FAIL'
// export function asyncFail(): AsyncFail {
// 	return { type: ASYNC_FAIL }
// }

// export type AsyncDataAction = GetAsyncData | AsyncSuccess | AsyncFail