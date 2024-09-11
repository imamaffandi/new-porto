import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
const skills = ["React", "Framer Motion", "THREE.JS", "Tailwind", "Figma"];
const About = () => {
  const mainRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const experienceBoxRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(leftColumnRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: true,
        },
      });

      gsap.to(rightColumnRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: true,
        },
      });

      gsap.to(experienceBoxRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: true,
        },
      });
      gsap.to(imageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          markers: true,
        },
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="relative" ref={mainRef}>
      <div className="flex justify-center items-center gap-3 h-screen p-10">
        <div
          ref={leftColumnRef}
          className="w-1/2 flex flex-col h-full bg-zinc-300"
        >
          <p className="text-8xl text-dark px-3 font-black helvetica">
            About Me
          </p>
          <p className="text-md montserrat text-dark text-justify p-3 pt-1 py-3">
            I'm Imam Affandi. Born in Malang, Indonesia, I like coding, hiking,
            and MCR. I started to learn code in vocational high school. I have a
            keen interest in building responsive and stylish websites, I like to
            learn new things. Now, I am learning Node.js and MongoDB to know
            about backend and database development. I will do anything to
            achieve my goals, even if it make my gerd even worse.
          </p>
          <a
            href="../assets/cv/FrontEnd.pdf"
            download="Imamaffandi_CV.pdf"
            className="hoverable cursor-none text-7xl helvetica text-dark text-justify p-1 mx-2 py-2 pt-7 border-b-2 border-dark"
            onClick={(e) => {
              e.preventDefault();
              window.open("../assets/cv/FrontEnd.pdf", "_blank");
            }}
          >
            CV
          </a>
          <a
            href="/"
            className="hoverable text-7xl cursor-none helvetica text-dark text-justify p-1 py-3 mx-2 border-b-2 border-dark"
          >
            Instagram
          </a>
        </div>
        <div
          ref={rightColumnRef}
          className="w-1/2 text-center h-full flex flex-col gap-3 justify-center items-center"
        >
          <div className=" h-1/2 w-full text-justify bg-stone-300 overflow-hidden">
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
            <div className="h-full w-1/2 full bg-neutral-300 overflow-hidden">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1720048170996-40507a45c720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
                alt="my picture"
                className="size-full object-bottom object-cover scale-110"
              />
            </div>
            <div className="h-full w-1/2 full bg-gray-300 p-2 flex flex-col justify-center items-start">
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
        ref={experienceBoxRef}
        className=" absolute w-72 h-80 bg-slate-300 -bottom-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center"
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
