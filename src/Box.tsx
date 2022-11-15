import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useBox } from '@react-three/cannon'
import { useSpring, animated, config } from "@react-spring/three";

interface IBox {
    position: [x: number, y: number, x: number]
}

const Box = ({ position }: IBox) => {

    const [active, setActive] = useState(false);

    const { scale } = useSpring({
        scale: active ? 1.5 : 1,
        config: config.wobbly,
    });

    // useBox的第二个参数 api 中包含了设置物理引擎的一些方法
    const [boxRef, api] = useBox<THREE.Mesh>(() => ({
        position,
        // 重力效果为1
        mass: 1
    }))

    useFrame(() => {
        boxRef.current &&
            api.rotation.set(0, (boxRef.current.rotation.y += 0.01), 0)
    });

    return (
        <animated.mesh
            position={position}
            scale={scale}
            castShadow
            onClick={() => setActive(!active)}
            ref={boxRef}>
            <boxGeometry />
            <meshStandardMaterial color={0xff0000} />
        </animated.mesh>
    );
};

export default Box;
