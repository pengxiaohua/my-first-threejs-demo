import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
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

    // 键盘事件
    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)

    useEffect(() => {
        // 设置点击事件，a是左，d是右
        const eventHandle = ({ key }: KeyboardEvent, isDown: boolean) => {
            key === 'a' && setLeft(isDown)
            key === 'd' && setRight(isDown)
        }

        const upEvent = (e: KeyboardEvent) => eventHandle(e, false)
        const downEvent = (e: KeyboardEvent) => eventHandle(e, true)

        window.addEventListener('keyup', upEvent)
        window.addEventListener('keydown', downEvent)

        // 清空点击事件
        return () => {
            window.removeEventListener('keyup', upEvent)
            window.removeEventListener('keydown', downEvent)
        }
    }, [])

    useFrame(() => {
        // 按下向左或者向右的按键，时候，发生偏移 -0.5 或者 0.5
        const moveX = left ? -0.5 : (right ? 0.5 : 0)
        moveShip([moveX, 0, 0])
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
