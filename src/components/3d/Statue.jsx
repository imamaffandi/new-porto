import { useRef, Suspense, useEffect } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
const Statue = () => {
  const statue = useGLTF("/src/components/3d/crow/statue.gltf");
  const statueMesh = useRef();

  return (
    <mesh ref={statueMesh}>
      <pointLight intensity={40} position={[3.5, -3.5, 6]} />
      <pointLight intensity={50} position={[-3.5, 5, 6]} />
      <pointLight intensity={20} position={[-3.5, 3, -6]} />
      <primitive object={statue.scene} scale={5} position={[0, -1, 0]} />
    </mesh>
  );
};

function StatueScene() {
  return (
    <div className="w-1/2 h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas frameloop="always" camera={{ position: [5, 0, -5], fov: 50 }}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
          <Statue />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default StatueScene;
