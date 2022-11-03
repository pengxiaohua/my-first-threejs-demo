import React from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import './index.css'

const Box = () => (
  <mesh castShadow>
    <boxGeometry />
    <meshStandardMaterial color="#1890FF" />
  </mesh>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} />
      <OrbitControls makeDefault />
      <Box />
    </Canvas>
  </React.StrictMode>
)
