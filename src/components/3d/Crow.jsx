import { useRef, useState, Suspense } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
const Crow = () => {
  const crow = useGLTF("/crow.glb");
  const [animationStarted, setAnimationStarted] = useState(false);
  const crowMesh = useRef();

  useFrame(() => {
    const handleScroll = () => {
      setAnimationStarted(true);
    };
    if (animationStarted) {
      const scrollPosition = window.scrollY;
      crowMesh.current.position.z = scrollPosition * 0.001;
      crowMesh.current.position.x = scrollPosition * -0.01;
      crowMesh.current.rotation.y = scrollPosition * 0.001;
    }
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <mesh ref={crowMesh}>
      <pointLight intensity={40} position={[3.5, -3.5, 6]} />
      <pointLight intensity={50} position={[-3.5, 5, 6]} />
      <pointLight intensity={20} position={[-3.5, 3, -6]} />
      <primitive object={crow.scene} scale={0.28} position={[0, -3.25, -1.5]} />
    </mesh>
  );
};

function CrowScene() {
  return (
    <div className="fixed w-full h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas frameloop="always" camera={{ position: [20, 10, 3], fov: 25 }}>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />

          <Crow />
        </Canvas>
      </Suspense>
    </div>
  );
}

export default CrowScene;
