import React, { useEffect, useRef, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useAnimations, useGLTF, Loader } from '@react-three/drei'
import { Physics } from '@react-three/cannon'

import SkyBox from './components/SkyBox'
import Ground from './components/Ground'
import Ship from './components/Ship'
import Cubes from './components/Cubes'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <SkyBox />
      {/* 使用Physics包裹，增加地面、方块和飞船的物理特性 */}
      <Physics>
        <Ground />
        <Cubes />
        <Ship />
      </Physics>
    </Canvas>
    {/* 初始化进度条 */}
    <Loader />
  </React.StrictMode>
)
