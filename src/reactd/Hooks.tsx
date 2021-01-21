import React, { useState, useEffect, useRef } from 'react'
import { Button } from 'antd'
/*
 * useEffect
 * 第二个参数控制是否重新渲染，参数数组的变量是否改变来控制
 * 传入空数组则只在componentDidMount\componentWillUnmount时执行
 */


export default function Hooks() {
	const [count, setCount] = useState(0)
	const pEl = useRef<HTMLParagraphElement>(null)

	useEffect(() => {
		console.info('componentDidMount')
		return () => {
			console.info('componentWillUnmount')
		}
	}, [])

	useEffect(() => {
		//componentDidUpdate
		console.info(pEl.current!.innerHTML)
	}, [count])

	return (
		<div>
			<h1>Hooks-钩子</h1>
			<p ref={pEl}>You clicked {count} times</p>
			<Button onClick={() => setCount(count + 1)}>Click me</Button>
		</div>
	)
}