import React, { useState, useEffect, useRef } from 'react'
import { fromEvent } from 'rxjs'
import { map, debounceTime } from 'rxjs/operators'

/**
 * input值改变后，延迟1s发送一个请求
 * 
 */

export default function RxInput() {
	const inp = useRef<HTMLInputElement>(null)
	const [value, setValue] = useState('')
	useEffect(() => {
		if (!inp.current) return
		const observable = fromEvent(inp.current, 'keyup').pipe(
			debounceTime(1000),
			map((e: any) => e.target.value)
		)
		const subscription = observable.subscribe(v => {
			setValue(v)
			//发送请求
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])
	return (
		<>
			<h1>RxInput</h1>
			<input ref={inp} type="text" />
			<h2>{value}</h2>
		</>
	)
}