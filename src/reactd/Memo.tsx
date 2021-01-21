import React, { useState, useEffect } from 'react'
import { Button, Switch } from 'antd'
/*
	*Memo组件修改状态
	*防止MyComponent重新渲染
*/

const MyComponent = React.memo(function MyComponent(props: any) {
	console.log('I am rendering')
	return (
		<Switch checked={props.open} />
	)
}, function (prevProps, nextProps) {
	//如果上一次的状态等于下一次的状态，就不更新
	if (prevProps.open === nextProps.open) {
		return true
	} else {
		return false
	}
})

export default function Memo(props: any) {
	const [open, setOpen] = useState(true)
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		const timerID = setInterval(() => {
			setDate(new Date())
		}, 1000)
		return () => {
			clearInterval(timerID)
		}
	})
	return (
		<div>
			<Button onClick={() => setOpen(!open)}>OPEN</Button>
			<MyComponent open={open} />
			<h3>{date.toString()}</h3>
		</div>
	)
}