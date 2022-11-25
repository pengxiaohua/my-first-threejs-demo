import { useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

// 定义飞船模型
const ShipModel = () => {
    const { scene, animations } = useGLTF('/public/fighter/scene.gltf')
    const group = useRef<THREE.Group>(null)

    const { actions, names } = useAnimations(animations, group)

    // 播放飞船模型的动画
    useEffect(() => {
        actions[names[0]]?.play()
    }, [])
    

    return (
        <group ref={group}>
            <primitive object={scene} />
        </group>
    )
}

const Ship = () => {
    return (
        <>
            <Suspense fallback={null}>
                <ShipModel />
            </Suspense>
        </>
    )
}

export default Ship;
