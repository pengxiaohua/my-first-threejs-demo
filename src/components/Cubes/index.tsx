import { useBox } from "@react-three/cannon"
import * as THREE from 'three'

import { cubeSize, cubeCount } from "../../constant"
import { radomInRange } from "../../utils"

const Cubes = () => {
    const [boxRef] = useBox<THREE.InstancedMesh>(() => ({
        position: [radomInRange(-200, 200), 10, radomInRange(200, 1000)]
    }))

    return (
        <instancedMesh ref={boxRef} args={[undefined, undefined, cubeCount]}>
            <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
            <meshBasicMaterial color={0xff2190} />
        </instancedMesh>
    )
}

export default Cubes
