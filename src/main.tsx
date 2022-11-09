import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from 'react-dom/client'
import { act, Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei'
import { useSpring, animated, config } from "@react-spring/three";

import './index.css'

interface IBox {
  position: [x: number, y: number, x: number]
}

// 定义一个立方体
const Box = ({ position }: IBox) => {
  const myMesh = useRef();

  const [active, setActive] = useState(false)

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  })

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a;
  });

  return (
    <animated.mesh
      position={position}
      scale={scale}
      castShadow
      onClick={() => setActive(!active)}
      ref={myMesh}>
      <boxGeometry />
      <meshStandardMaterial color={0xff0000} />
    </animated.mesh>
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

const Model = () => {
  const robotRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/public/robot/scene.gltf')

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
      <Model />
    </Canvas>
  </React.StrictMode>
)
