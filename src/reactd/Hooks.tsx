import React, { useState, useEffect } from 'react'
import { Button } from 'antd'

export default function Hooks() {
	const [count, setCount] = useState(0)
	useEffect(() => {
		console.log('componentDidMount')
		return () => {
			console.log('componentWillUnmount')
		}
	}, [])

	useEffect(() => {
		console.log('componentDidUpdate')
		console.log(count)
	}, [count])

	return (
		<div>
			<h1>React Hooks</h1>
			<p >You clicked {count} times</p>
			<Button onClick={() => setCount(count + 1)}>CLICK</Button>
		</div>
	)
}