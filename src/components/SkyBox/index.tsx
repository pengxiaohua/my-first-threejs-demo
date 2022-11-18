import * as THREE from 'three'
import { useTexture } from '@react-three/drei'

const SkyBox = () => {

    const galaxyTexture = useTexture('/public/texture/galaxy.jpg')

    return (
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
    )
}

export default SkyBox
