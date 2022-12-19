import * as THREE from 'three'
import { usePlane } from '@react-three/cannon'

// 定义欧拉角，描述在三维坐标系的方向
const euler = new THREE.Euler(-Math.PI / 2, 0, 0)
// 设置立方体的三维向量位置坐标值
const position = new THREE.Vector3(0, -0.5, 0)

// 定义一个地平面
const Plane = () => {

    const [planeRef] = usePlane<THREE.Mesh>(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, 0, 0]
    }))

    return (
        <mesh
            ref={planeRef}
            receiveShadow
            rotation={euler}
            position={position}
        >
            {/* 设置 2D 水平面及其尺寸 */}
            <planeGeometry args={[10, 20]} />
            <meshStandardMaterial color={0xffffff} />
        </mesh>
    )
}

export default Plane;
