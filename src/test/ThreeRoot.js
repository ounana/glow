export default 2
// import React, { useEffect, useRef } from 'react'
// import {
//   Scene,
//   PerspectiveCamera,
//   WebGLRenderer,
//   BoxGeometry,
//   MeshBasicMaterial,
//   Mesh
// } from 'three'

// export default function ThreeRoot() {
//   const ref = useRef(null)
//   useEffect(() => {
//     const { current: root } = ref
//     //场景
//     const scene = new Scene()
//     //相机
//     var camera = new PerspectiveCamera(45, 800 / 500, 1, 1000)
//     //渲染器
//     var renderer = new WebGLRenderer()
//     renderer.setSize(800, 500)
//     root.appendChild(renderer.domElement)

//     //模型+材质=完全体
//     var geometry = new BoxGeometry(1, 1, 1)
//     var material = new MeshBasicMaterial({ color: 0x00ff00 })
//     var cube = new Mesh(geometry, material)
//     //加入场景
//     scene.add(cube)

//     //定位相机

//     camera.position.z = 5

//     function animate() {
//       requestAnimationFrame(animate)

//       cube.rotation.x += 0.01
//       cube.rotation.y += 0.01

//       renderer.render(scene, camera)
//     }
//     animate()
//   }, [])
//   return (
//     <div style={{ width: 800, height: 500 }} ref={ref}></div>
//   )
// }