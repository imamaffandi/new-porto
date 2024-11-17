import { useRef, useEffect } from "react";
import { Fluid } from "@whatisjery/react-fluid-distortion";
import { EffectComposer } from "@react-three/postprocessing";
import { Canvas } from "@react-three/fiber";
import { SectionWrapper } from "../HOC";
import { Text } from "@react-three/drei";
import gsap from "gsap";
import Helvetica from "../fonts/Helvetica.ttf";
import StatueScene from "../components/3d/Statue";

const Home = () => {
  const homeRef = useRef();
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.fromTo(
      homeRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5 }
    );
  });

  return (
    <>
      <StatueScene />
      <div className="h-screen w-full relative z-10 mix-blend-difference">
        <Canvas ref={homeRef}>
          <EffectComposer>
            <Fluid
              radius={0.02}
              curl={10}
              swirl={1}
              distortion={1}
              force={2}
              pressure={0.94}
              densityDissipation={0.98}
              velocityDissipation={0.99}
              intensity={0.3}
              rainbow={false}
              blend={0}
              showBackground={false}
              fluidColor="#151515"
            />
          </EffectComposer>
          <Text
            position={[0, 0, 0]}
            fontSize={1.5}
            color="#fff"
            anchorX="center"
            anchorY="middle"
            font={Helvetica}
          >
            IMAM AFFANDI
          </Text>
          <Text
            position={[0, -1, 0]}
            fontSize={0.3}
            color="#fff"
            font={Helvetica}
            anchorX="center"
            anchorY="middle"
          >
            Developer | Designer | Freelancer
          </Text>
        </Canvas>
      </div>
    </>
  );
};

export default SectionWrapper(Home, "home");
