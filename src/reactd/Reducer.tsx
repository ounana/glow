import React, { useReducer } from 'react'
import { Button } from 'antd'

const initState = { count: 5 }
function reducer(state: any, action: any) {
	switch (action.type) {
		case 'reset':
			return initState
		case 'increment':
			return {
				...state,
				count: state.count + 1
			}
		case 'decrement':
			return {
				...state,
				count: state.count - 1
			}
		default:
			return state
	}
}

export default function Reducer() {
	const [state, dispatch] = useReducer(
		reducer,
		initState
	)

	return (
		<div>
			<h3>Count: {state.count}</h3>
			<Button onClick={() => dispatch({ type: 'increment' })}>+</Button>
			<Button onClick={() => dispatch({ type: 'decrement' })}>-</Button>
			<Button onClick={() => dispatch({ type: 'reset' })}>reset</Button>
		</div>
	)
}