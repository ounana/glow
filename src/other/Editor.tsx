export default 2
// import React, { useEffect, useRef } from 'react';
// import E from 'wangeditor'
// import { Button } from 'antd';

// export default () => {
// 	const editor = useRef<E>()

// 	useEffect(() => {
// 		editor.current = new E('#toolbar', '#content')
// 		editor.current.create()
// 	}, [])

// 	const getEditorTxt = () => {
// 		console.info(editor.current!.txt.html())
// 	}
// 	return (
// 		<div>
// 			<div id="toolbar" style={{ flexWrap: 'wrap', backgroundColor: '#024f48' }}></div>
// 			<div id="content" style={{ backgroundColor: '#607d8b', height: 200, color: '#fff' }}><p></p></div>
// 			<Button type="primary" onClick={getEditorTxt}>获取内容</Button>
// 		</div>
// 	)
// }