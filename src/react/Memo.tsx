import { useState, useEffect, memo } from 'react'
import { Button, Switch } from 'antd'

/**
 * React Memo
 * react 的渲染机制是：上层组件的state\props 改变，
 * 那么下层组件的UI会全部重新渲染，
 * 
 * 下层组件要想不被渲染。需要使用
 * 函数组件使用React.memo包裹，或者类组件shouldComponentUpdate声明周期
 */

interface MySwitchProps {
	open: boolean
}

function MySwitch(props: MySwitchProps) {
	console.log('下层组件渲染了')
	return (
		<Switch checked={props.open} />
	)
}

function areEqual(prevProps: MySwitchProps, nextProps: MySwitchProps) {
	if (prevProps.open === nextProps.open) {
		return true
	} else {
		return false
	}
}

const MySwitchMemo = memo(MySwitch, areEqual)

export default function Memo() {
	const [open, setOpen] = useState(true)
	const [date, setDate] = useState(new Date())

	useEffect(() => {
		const timerID = setInterval(() => {
			setDate(new Date())
		}, 1000)
		return () => {
			clearInterval(timerID)
		}
	}, [])

	return (
		<div>
			<h1>React Memo</h1>
			<Button onClick={() => setOpen(!open)}>SWITCH</Button>
			<h3>{date.toString()}</h3>
			<MySwitchMemo open={open} />
		</div>
	)
}