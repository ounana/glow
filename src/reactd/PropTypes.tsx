import React from 'react'
import PropTypes from 'prop-types';

/*
	*静态类型检查
*/

function Greeting(props: any) {
	return (
		<h1>Hello, {props.name}</h1>
	)
}

Greeting.propTypes = {
	name: PropTypes.string
}

export default function PropTypesComponent() {
	return (
		<div>
			<Greeting name={'Bob'} />
		</div>
	)
}
