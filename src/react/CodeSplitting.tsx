import { Suspense, lazy } from 'react'

/**
 * Code Splitting
 * 按需加载组件
 */

const OtherComponent = lazy(() => import('./Hooks'))

export default function CodeSplitting() {
	return (
		<div>
			<h1>React Code Splitting</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<OtherComponent />
			</Suspense>
		</div>
	)
}