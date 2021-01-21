import React, { Suspense } from 'react'

/*
	代码分割
	lazy
	Suspense
*/

const OtherComponent = React.lazy(() => import('./OtherComponent'))

const CodeSplitting = () => {
	return (
		<div>
			<h1>CodeSplitting-代码分割</h1>
			<Suspense fallback={<div>Loading...</div>}>
				<OtherComponent />
			</Suspense>
		</div>
	)
}
export default CodeSplitting