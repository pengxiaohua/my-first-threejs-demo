import React, { useEffect, useRef, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useAnimations, useGLTF, Loader } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import SkyBox from './components/SkyBox'
import Ground from './components/Ground'
import Plane from './Plane'
import Box from './Box'
import Ship from './components/Ship'
import './index.css'


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
      <OrbitControls makeDefault />
      <SkyBox />
      <Ground />
      <Ship />
      {/* <directionalLight position={[10, 5, 5]} intensity={2} castShadow />
      <Physics>
        <Box position={[-1, 0, 2]} />
        <Box position={[2, 0, 2]} />
        <Plane /> */}
        {/* 使用Suspense */}
        {/* <Suspense fallback={null}>
          <Model />
        </Suspense>
      </Physics> */}
    </Canvas>
    {/* 初始化进度条 */}
    <Loader />
  </React.StrictMode>
)
