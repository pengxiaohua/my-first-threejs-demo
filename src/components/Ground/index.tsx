import { useLayoutEffect } from 'react'
import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

import { planeSize, planeTextureSize } from "../../constant"

interface IPlaneProps {
    position: THREE.Vector3
}

const Plane = ({ position } : IPlaneProps) => {
    const texture = useTexture('/public/texture/grid-pink.png')
    useLayoutEffect(() => {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(planeTextureSize, planeTextureSize)
        texture.anisotropy = 16
    }, [texture])

    return (
        <mesh
            rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}
            position={position}
        >
            <planeBufferGeometry args={[planeSize, planeSize]} />
            <meshStandardMaterial
                emissive={0xffffff}
                roughness={0}
                metalness={0}
                emissiveMap={texture}
                map={texture}
            />
        </mesh>
    )
}

const Ground = () => {
    return (
        <>
            <Plane position={new THREE.Vector3(0, 0, -planeSize / 2)} />
            <Plane position={new THREE.Vector3(0, 0, -planeSize - planeSize / 2)} />
        </>
    )
}

export default Ground
