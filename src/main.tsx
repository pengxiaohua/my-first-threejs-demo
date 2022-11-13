import React, { useEffect, useRef, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useAnimations, useGLTF, Loader } from '@react-three/drei'

import Box from './Box'
import './index.css'

interface IBox {
  position: [x: number, y: number, x: number]
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

// 机器人模型
const Model = () => {
  const robotRef = useRef<THREE.Group>(null)
  // 加载模型
  const { scene, animations } = useGLTF('/public/robot/scene.gltf')
  // 播放模型动画
  const { actions, names } = useAnimations(animations, robotRef)

  useEffect(() => {
    actions[names[0]]?.play()
  }, [])
  
  return (
    <group>
      <primitive object={scene} ref={robotRef} />
    </group>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 5, 5]} intensity={2} castShadow />
      <OrbitControls makeDefault />
      <Box position={[-1, 0, 2]} />
      <Box position={[2, 0, 2]} />
      <Plane />
      {/* 使用Suspense */}
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
    {/* 初始化进度条 */}
    <Loader />
  </React.StrictMode>
)
