import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import './index.css'

const Box = () => (
  <mesh castShadow>
    <boxGeometry />
    <meshStandardMaterial color={0xff0000} />
  </mesh>
)

const Plane = () => (
  <mesh receiveShadow>
    <planeGeometry />
    <meshStandardMaterial color={0xffffff} />
  </mesh>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} castShadow />
      <OrbitControls makeDefault />
      <Box />
      <Plane />
    </Canvas>
  </React.StrictMode>
)
