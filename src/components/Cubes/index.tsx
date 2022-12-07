/**
 * 方块组件
 */
import { Triplet, useBox } from "@react-three/cannon"
import * as THREE from 'three'

import { cubeSize, cubeCount } from "../../constant"
import { radomInRange } from "../../utils"

const Cubes = () => {
    // 设置Box尺寸
    const boxSize: Triplet = [cubeSize, cubeSize, cubeSize]

    const [boxRef] = useBox<THREE.InstancedMesh>(() => ({
        position: [radomInRange(-200, 200), 10, radomInRange(200, 1000)],
        mass: 1,
        args: boxSize
    }))

    return (
        <instancedMesh ref={boxRef} args={[undefined, undefined, cubeCount]}>
            <boxGeometry args={boxSize} />
            <meshBasicMaterial color={0xff2190} />
        </instancedMesh>
    )
}

export default Cubes
