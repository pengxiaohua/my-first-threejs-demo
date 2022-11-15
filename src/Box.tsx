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

    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        boxRef.current && (boxRef.current.rotation.y = a)
    });

    const [boxRef] = useBox<THREE.Mesh>(() => ({
        position,
        // 重力效果为1
        mass: 1
    }))

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
