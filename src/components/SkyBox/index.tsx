import { useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useTexture, Stars } from '@react-three/drei'

const SkyBox = () => {

    const galaxyTexture = useTexture('/public/texture/galaxy.jpg')

    useLayoutEffect(() => {
        galaxyTexture.wrapS = galaxyTexture.wrapT = THREE.MirroredRepeatWrapping
        galaxyTexture.repeat.set(2, 2)
    })

    return (
        <>
            <Stars factor={30} fade speed={2} depth={50} radius={280} count={6000} saturation={0} />
            <mesh>
                <sphereBufferGeometry args={[800, 32, 32]} />
                <meshPhongMaterial 
                    emissive={0xff2190}
                    side={THREE.BackSide}
                    // 发光的强度
                    emissiveIntensity={0.1}
                    map={galaxyTexture}
                />
            </mesh>
        </>
    )
}

export default SkyBox
