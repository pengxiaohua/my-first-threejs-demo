import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from 'three'

import { shipFlySpeed } from '../../constant'

interface IShipModelRef {
    shipModel: React.RefObject<THREE.Group>
}

// 定义飞船模型
const ShipModel = forwardRef<IShipModelRef>((props, ref) => {
    const { scene, animations } = useGLTF('/public/fighter/scene.gltf')
    const group = useRef<THREE.Group>(null)

    const { actions, names } = useAnimations(animations, group)

    // 播放飞船模型的动画
    useEffect(() => {
        void actions[names[0]]?.play()
    }, [])

    useImperativeHandle(ref, () => (
        {
            shipModel: group
        }
    ))

    useFrame(() => {
        group.current?.position.set(0, 3, group.current?.position.z - shipFlySpeed)
    })

    return (
        <group ref={group} scale={2} position={[0, 3, -20]}>
            {/* 设置 rotation={[0, Math.PI, 0]} 旋转180度 */}
            <primitive rotation={[0, Math.PI, 0]} object={scene} />
        </group>
    )
})

const Ship = () => {
    // 定义相机位
    const camera = useRef<THREE.PerspectiveCamera>(null)
    const ShipModelRef = useRef<IShipModelRef>(null)

    useFrame(() => {
        if (!ShipModelRef.current || !camera.current) {
            return
        }

        const { x, y, z } = ShipModelRef.current?.shipModel.current!.position

        // 设置相机位置
        camera.current.position.set(x, y + 4, z + 10)
    })

    return (
        <>
            <PerspectiveCamera ref={camera} makeDefault fov={75} near={0.1} far={1200} />
            <Suspense fallback={null}>
                <ShipModel ref={ShipModelRef} />
            </Suspense>
        </>
    )
}

export default Ship;
