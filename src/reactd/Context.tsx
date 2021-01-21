import React, { useState, useContext } from 'react'
import { Button } from 'antd'
const ContextCount = React.createContext(0)

/*
	*传递props
	不用每层都传递props
*/

export default function Context() {
	const [count, setCount] = useState(0)
	return (
		<div>
			<h1>Context-上下文</h1>
			<Button onClick={() => setCount(count + 1)}>按钮</Button>
			<ContextCount.Provider value={count}>
				<Greeting />
			</ContextCount.Provider>
		</div>
	)
}

function Greeting() {
	const count = useContext(ContextCount)
	return (
		<h2>Count, {count}</h2>
	)
}