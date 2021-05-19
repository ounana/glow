import { useReducer } from 'react'
import { Button } from 'antd'

interface State { count: number }
const initState: State = { count: 5 }

type Action = { type: 'RESET' } | { type: 'INCREMENT' } | { type: 'DECREMENT' }

function reducer(state: State, action: Action) {
	switch (action.type) {
		case 'RESET':
			return initState
		case 'INCREMENT':
			return { ...state, count: state.count + 1 }
		case 'DECREMENT':
			return { ...state, count: state.count - 1 }
		default:
			return state
	}
}

export default function UseReducer() {
	const [state, dispatch] = useReducer(reducer, initState)
	return (
		<div>
			<h1>React Reducer</h1>
			<h3>Count: {state.count}</h3>
			<Button onClick={() => dispatch({ type: 'INCREMENT' })}>+</Button>
			<Button onClick={() => dispatch({ type: 'DECREMENT' })}>-</Button>
			<Button onClick={() => dispatch({ type: 'RESET' })}>RESET</Button>
		</div>
	)
}