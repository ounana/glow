import { useState, useContext, createContext } from 'react'
import { Button } from 'antd'

const MyContext = createContext(0)

/**
 * Context
 * 传递状态 不用每层都传递props
 */

export default function Context() {
	const [count, setCount] = useState(0)
	return (
		<div>
			<h1>React Context</h1>
			<Button onClick={() => setCount(count + 1)}>按钮</Button>
			<MyContext.Provider value={count}>
				<Greeting />
			</MyContext.Provider>
		</div>
	)
}

function Greeting() {
	const count = useContext(MyContext)
	return (
		<h2>You clicked {count} times</h2>
	)
}