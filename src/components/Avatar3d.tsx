import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Avatar3D() {
    const { scene } = useGLTF("/models/Totoro.glb"); // Заменить на путь к модели

    return (
        <Canvas camera={{ position: [0, 0.5, 4] }} className="w-full h-full">
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <primitive object={scene} scale={0.15} position={[0, -2, 0]} />
            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}

export default Avatar3D;
