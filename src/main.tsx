import React, {useRef} from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

import './index.css'

// 定义一个立方体
const Box = () => {
  const myMesh = useRef();

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a;
  });

  return (
    <mesh castShadow ref={myMesh}>
      <boxGeometry />
      <meshStandardMaterial color={0xff0000} />
    </mesh>
  )
}


// 定义欧拉角，描述在三维坐标系的方向
const euler = new THREE.Euler(-Math.PI / 2, 0, 0)
// 设置立方体的三维向量位置坐标值
const position = new THREE.Vector3(0, -0.5, 0)

// 定义一个地平面
const Plane = () => (
  <mesh
    receiveShadow
    rotation={euler}
    position={position}
  >
    {/* 设置2D水平面及其尺寸 */}
    <planeGeometry args={[10, 20]} />
    <meshStandardMaterial color={0xffffff} />
  </mesh>
)

const All = () => {
  return (
    <mesh>
      <Box />
      <Plane />
    </mesh>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} castShadow />
      <OrbitControls makeDefault />
      <Box />
      <Plane />
    </Canvas>
  </React.StrictMode>
)
