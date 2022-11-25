import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

import { planeSize } from "../../constant"

const Ground = () => {
    const texture = useTexture('/')
    return (
        <>
            <mesh rotation={new THREE.Euler(-Math.PI / 2, 0, 0)}>
                <planeBufferGeometry args={[planeSize, planeSize]} />
                <meshStandardMaterial emissive={0xffffff} roughness={0} metalness={0} />
            </mesh>
        </>
    )
}

export default Ground
