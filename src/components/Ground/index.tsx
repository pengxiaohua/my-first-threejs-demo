import { planeSize } from "../../constant"

const Ground = () => {
    return (
        <>
            <mesh>
                <planeBufferGeometry args={[planeSize, planeSize]} />
                <meshStandardMaterial emissive={0xffffff} roughness={0} metalness={0} />
            </mesh>
        </>
    )
}

export default Ground
