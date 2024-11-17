import { useRef, Suspense, useEffect } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Statue = () => {
  const statue = useGLTF("/src/components/3d/crow/statue.gltf");
  const statueMesh = useRef();

  useEffect(() => {
    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#statue-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        markers: true,
      },
    });

    // Animate the statue
    tl.to(statueMesh.current.rotation, {
      y: Math.PI * 2,
      duration: 2,
    }).to(
      statueMesh.current.position,
      {
        x: 2,
        duration: 1,
      },
      0
    );
  }, []);

  return (
    <mesh ref={statueMesh}>
      <pointLight intensity={40} position={[3.5, -3.5, 6]} />
      <pointLight intensity={50} position={[-3.5, 5, 6]} />
      <pointLight intensity={20} position={[-3.5, 3, -6]} />
      <primitive object={statue.scene} scale={10} position={[0, -3.5, 0]} />
    </mesh>
  );
};

function StatueScene() {
  return (
    <div id="statue-container" className="h-screen w-full fixed top-0 left-0">
      <Suspense fallback={<div>Loading...</div>}>
        <Canvas
          frameloop="always"
          camera={{ position: [5, 0, 2], fov: 50 }}
          style={{ background: "transparent" }}
        >
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate={true}
            rotateSpeed={0.5}
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
