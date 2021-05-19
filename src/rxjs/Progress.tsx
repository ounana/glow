import React, { useState, useEffect } from 'react'
import { interval } from 'rxjs'
import { take, map } from 'rxjs/operators'
import { Progress } from 'antd'

export default function RxProgress() {
	const [percent, setPercent] = useState(0)
	useEffect(() => {
		const observable = interval(60).pipe(
			take(10),
			map(v => (v + 1) * 10)
		)
		const subscription = observable.subscribe(x => {
			setPercent(x)
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [])
	return (
		<>
			<h1>RxProgress</h1>
			<Progress percent={percent} />
		</>
	)
}