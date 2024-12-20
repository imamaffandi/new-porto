import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile } from "../assets";
gsap.registerPlugin(ScrollTrigger);
const services = [
  "Wireframes",
  "Prototyping",
  "Fully Responsive Build",
  "Interactions & Animations",
  "Performance",
  "Accessibility",
  "SEO",
  "Security",
];
const skills = [
  "React / Next",
  "Framer Motion",
  "WebGL / THREE.JS",
  "Tailwind / CSS",
  "Figma",
];
const About = () => {
  const mainRef = useRef(null);
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const imageRef = useRef(null);
  const skillsRef = useRef(null);
  const experienceRef = useRef(null);
  const hoverRef = useRef(null);
  const imgContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.defaults({ ease: "back.out", duration: 10 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top",
          end: "bottom",
          toggleActions: "restart none none reverse",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        aboutRef.current,
        { x: -100, y: -50, opacity: 0 },
        { x: 0, y: 0, opacity: 1 },
        "+=1"
      )
        .fromTo(
          servicesRef.current,
          { x: 100, y: -50, opacity: 0 },
          { x: 0, y: 0, opacity: 1 },
          "+=1"
        )
        .fromTo(
          hoverRef.current,
          { x: -100, y: 50, opacity: 0 },
          { x: 0, y: 0, opacity: 1 },
          "+=1"
        )
        .fromTo(
          imgContainerRef.current,
          { y: 100, opacity: 0 },
          { y: 0, opacity: 1 },
          "+=1"
        )
        .fromTo(
          imageRef.current,
          { y: 0, opacity: 0 },
          { y: -100, opacity: 1 },
          "+=1"
        )
        .fromTo(
          skillsRef.current,
          { x: 100, y: 50, opacity: 0 },
          { x: 0, y: 0, opacity: 1 },
          "+=1"
        )

        .fromTo(
          experienceRef.current,
          { y: 1000, opacity: 0 },
          { y: 0, opacity: 1 },
          "+=1"
        );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative" ref={mainRef}>
      <div className="flex justify-center items-center gap-3 h-screen p-10">
        <div className="w-1/2 flex flex-col justify-between py-2 h-full ">
          <div ref={aboutRef} className="">
            <p className="text-8xl text-dark px-3 font-black helvetica">
              About Me
            </p>
            <p className="text-md montserrat text-dark text-justify p-3 pt-1 py-3">
              I'm Imam Affandi. Born in Malang, Indonesia, I am a creative
              front-end web developer with 3+ years of experience. I love to
              create engaging, creative, and interactive websites.
            </p>
          </div>
          <div ref={hoverRef} className="flex flex-col">
            <a
              href="../assets/cv/FrontEnd.pdf"
              download
              className="hoverable cursor-none w-full h-full text-7xl helvetica text-dark text-justify p-1 mx-2 py-2 pt-7 border-b-2 border-dark"
            >
              CV
            </a>
            <a
              href="https://www.instagram.com/imamaffandi01/"
              target="_blank"
              className="hoverable text-7xl w-full h-full cursor-none helvetica text-dark text-justify p-1 py-3 mx-2 border-b-2 border-dark "
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="w-1/2 text-center h-full flex flex-col gap-3 justify-center items-center">
          <div
            ref={servicesRef}
            className=" h-1/2 w-full text-justify  overflow-hidden"
          >
            <p className="text-justify helvetica font-black text-5xl">
              {services.map((service, index) => (
                <React.Fragment key={service}>
                  {service}
                  {index !== services.length - 1 && (
                    <span className="inline-flex justify-center items-center mx-5 rounded-full bg-dark size-5"></span>
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className="text-xl flex justify-center items-center h-1/2 w-full gap-2 ">
            <div
              ref={imgContainerRef}
              className="h-full w-1/2 full overflow-hidden "
            >
              <img
                ref={imageRef}
                className="object-cover object-bottom"
                src={profile}
                alt="profile"
              />
            </div>
            <div
              ref={skillsRef}
              className="h-full w-1/2 full  p-2 flex flex-col justify-center items-start"
            >
              {skills.map((skill) => (
                <p
                  key={skill}
                  className="text-md font-semibold py-2 montserrat border-b-2 border-dark w-full text-dark text-justify"
                >
                  {skill}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div
        ref={experienceRef}
        className=" absolute w-72 h-80 bg-zinc-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
      >
        <div className="w-1/2 h-full  flex helvetica justify-center items-center">
          <p className="text-9xl font-black">3+</p>
        </div>
        <div className="w-1/2 h-full text-3xl  montserrat">
          <p>years</p>
          <p>of experience</p>
        </div>
      </div>
    </main>
  );
};

export default About;
