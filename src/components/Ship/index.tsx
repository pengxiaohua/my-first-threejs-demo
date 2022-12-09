import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from 'three'
import { useBox } from "@react-three/cannon";

import { useStore } from "../../store";

interface IShipModelRef {
    shipModel: React.RefObject<THREE.Group>
}

// 定义飞船模型
const ShipModel = forwardRef<IShipModelRef>((props, ref) => {
    const { shipPosition, moveShip } = useStore()

    const { scene, animations } = useGLTF('/public/fighter/scene.gltf')

    // 盒子包裹飞船，可以产生碰撞，而不是穿过盒子cube
    const [group, api] = useBox<THREE.Group>(() => ({
        position: shipPosition,
        // 不用重力
        mass: 0
    }), useRef(null), [ shipPosition ])

    const { actions, names } = useAnimations(animations, group)

    // 播放飞船模型的动画
    useEffect(() => {
        void actions[names[0]]?.play()
    }, [])

    useImperativeHandle(ref, () => ({ shipModel: group }))

    useFrame(() => {
        moveShip()
        // group.current?.position.set(0, 3, group.current?.position.z - shipFlySpeed)
    })

    return (
        <group ref={group} scale={2}>
            {/* 设置 rotation={[0, Math.PI, 0]} 旋转180度 */}
            <primitive rotation={[0, Math.PI, 0]} object={scene} />
        </group>
    )
})

const Ship = () => {
    // 定义相机位
    const camera = useRef<THREE.PerspectiveCamera>(null)
    const ShipModelRef = useRef<IShipModelRef>(null)

    const shipPosition = useStore(state => state.shipPosition)

    // useFrame(() => {
    //     if (!ShipModelRef.current || !camera.current) {
    //         return
    //     }

    //     const { x, y, z } = ShipModelRef.current?.shipModel.current!.position
    //     moveShip([x, y, z])
    //     // 设置相机位置
    //     camera.current.position.set(x, y + 4, z + 10)
    // })

    useEffect(() => {
        if (!camera.current) {
            return
        }

        const [x, y, z] = shipPosition
        // 设置相机位置
        camera.current.position.set(x, y + 4, z + 14)
    }, [shipPosition])

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
