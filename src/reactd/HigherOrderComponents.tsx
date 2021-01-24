/*
	React HOC
	以组件作为参数并返回新组件的函数
	作用：注入一些props
*/

import { Button } from "antd"

const store = { count: 0 }
type Store = typeof store

function dispatch() {
	store.count += 1
	console.log(store)
}
type Dispatch = typeof dispatch

function MyConnect<P>(Component: any) {
	return (props: Omit<P, keyof Store | 'dispatch'>) => {
		return <Component {...props} dispatch={dispatch} {...store} />
	}
}

export default MyConnect<HigherOrderProps>(HigherOrder)

interface HigherOrderProps extends Store {
	dispatch: Dispatch,
	name: string
	age: number
}

function HigherOrder(props: HigherOrderProps) {
	const { name, age, count, dispatch } = props
	return (
		<div>
			<h1>React Higher-Order Components</h1>
			<h3>Name: {name}, age: {age}</h3>
			<h3>count: {count}</h3>
			<Button onClick={dispatch}>DISPATCH</Button>
		</div>
	)
}