import { useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

import { planeSize, planeTextureSize } from "../../constant"

const Ground = () => {
    const texture = useTexture('/public/texture/grid-pink.png')
    useLayoutEffect(() => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(planeTextureSize, planeTextureSize)
        texture.anisotropy = 16
    }, [texture])

    return (
        <>
            <mesh rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}>
                <planeBufferGeometry args={[planeSize, planeSize]} />
                <meshStandardMaterial
                    emissive={0xffffff}
                    roughness={0}
                    metalness={0}
                    emissiveMap={texture}
                    map={texture}
                />
            </mesh>
        </>
    )
}

export default Ground
