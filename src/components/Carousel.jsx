import React, { useState, useRef, useEffect } from "react";
import { CharSplit } from "./Split";
import gsap from "gsap";
const Carousel = ({ projects }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const imageRef = useRef(null);
  const numberRef = useRef(null);
  const titleRef = useRef(null);

  const handleWheel = (e) => {
    e.preventDefault();
    if (!isScrolling) {
      setIsScrolling(true);
      const direction = e.deltaY > 0 ? 1 : -1;
      setActiveIndex((prev) => {
        const newIndex = Math.max(
          0,
          Math.min(prev + direction, projects.length - 1)
        );
        return newIndex;
      });
      setTimeout(() => setIsScrolling(false), 700);
    }
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to([imageRef.current, numberRef.current], {
      duration: 0.5,
      opacity: 1,
      scale: 1,
      stagger: 1,
      onComplete: () => {
        gsap.to([imageRef.current, numberRef.current], {
          duration: 0.3,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          ease: "power2.inOut",
        });
      },
    });
  }, [activeIndex]);

  return (
    <div
      className="relative h-screen w-full overflow-hidden"
      onWheel={handleWheel}
    >
      <div className="h-screen w-full relative">
        <aside className="absolute top-32 left-5 w-[60%] h-[60%] flex">
          <img
            ref={imageRef}
            onClick={() => {
              window.open(projects[activeIndex].preview);
            }}
            src={projects[activeIndex].image}
            className="w-3/4 object-cover brightness-75 hover:brightness-90 cursor-pointer"
            alt={projects[activeIndex].name}
          />
          <p>
            <CharSplit
              text={String(activeIndex + 1).padStart(2, "0")}
              className={
                "text-dark absolute top-0 right-0 sf text-xs opacity-75 font-light tracking-widest flex items-center gap-px"
              }
              delay={0.09}
              duration={0.45}
              speed={0.03}
            />
          </p>
          <p
            ref={titleRef}
            className="text-white absolute bottom-0 right-1/4 sf text-xl font-semibold tracking-widest"
          >
            {projects[activeIndex].name}
          </p>
        </aside>
      </div>
    </div>
  );
};
export default Carousel;
