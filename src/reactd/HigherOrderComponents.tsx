import React from 'react';

/*
	高阶组件

	概念
	高阶组件是一个获取组件并返回新组件的函数
	就是高阶函数
	参数是一个组件
	返回一个新组件
	
	作用
	高阶组件内可定制props

*/

const WrappedComponent = (props: any) => {
	console.log(props)
	return (
		<h1>Higher-Order Components -高阶组件</h1>
	)
}

const HigherOrderComponents = (Wraped: any) => {
	return (props: any) => {
		return <Wraped age="18" {...props} />
	}
}


export default HigherOrderComponents(WrappedComponent)