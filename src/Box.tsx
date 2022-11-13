import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { act, Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  useAnimations,
  useGLTF,
  Loader,
} from "@react-three/drei";
import { useSpring, animated, config } from "@react-spring/three";

const Box = ({ position }: IBox) => {
  const myMesh = useRef();

  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.y = a;
  });

  return (
    <animated.mesh
      position={position}
      scale={scale}
      castShadow
      onClick={() => setActive(!active)}
      ref={myMesh}>
      <boxGeometry />
      <meshStandardMaterial color={0xff0000} />
    </animated.mesh>
  );
};

export default Box;
