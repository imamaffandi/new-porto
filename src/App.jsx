import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { socialMedia } from "./constant/constant";
import { CharSplit, WordSplit, LineSplit } from "./components/Split";
import { Slider } from "./components";
import Lenis from "lenis";
// import { Fluid } from "@whatisjery/react-fluid-distortion";
const App = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: true,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="bg-light">
        <nav className="flex sf-thin text-dark pt-2 justify-between items-center px-16 fixed top-0 w-full z-50">
          <a className="text-xs tracking-wider font-semibold" href="">
            <WordSplit
              text={"imamaffandi715@gmail.com"}
              duration={0.2}
              delay={0.1}
              speed={0.009}
            />
          </a>
          <section>
            <p className="flex items-center gap-1">
              <WordSplit
                text={"Indonesia"}
                duration={0.5}
                delay={0.2}
                speed={0.05}
                className={"text-xs"}
              />
              <span className="text-xs flex gap-1 items-center">
                <TimeComponent />
              </span>
            </p>
            <div className="flex items-center gap-2">
              {" "}
              {socialMedia.map((social, index) => (
                <a href={social.link} target="_blank" key={social.name}>
                  <WordSplit
                    text={social.name}
                    className={
                      "font-light sf-thin tracking-tight text-xs opacity-80"
                    }
                    duration={0.5}
                    delay={1 + index * 0.2}
                    speed={0.05}
                  />
                </a>
              ))}
            </div>
          </section>
        </nav>
        {/* Home */}
        <main className="relative h-screen overflow-hidden">
          <div className="h-screen w-full relative z-10 ">
            <div className="relative w-full h-screen overflow-hidden">
              {/* <Slider /> */}
            </div>
            <div>
              <CharSplit
                text={"Developer && Freelancer"}
                className={
                  "absolute text-4xl font-bold w-full text-dark sf bottom-0 left-0"
                }
                delay={0.4}
                duration={0.5}
                speed={0.03}
              />
            </div>
            <div className="absolute right-0 top-32 opacity-75">
              <p className="w-72 text-xs text-justify sf-thin text-dark">
                <LineSplit
                  text={"I'm Imam Affandi. Born in Malang, Indonesia."}
                  delay={0.5}
                  duration={0.5}
                  speed={0.05}
                />

                <LineSplit
                  text={"I am a creative Fullstack web developer."}
                  delay={0.6}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  text={"I love to create engaging, creative,"}
                  delay={0.7}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  text={" and interactive websites."}
                  delay={0.8}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  text={"I usually use React, Tailwind, Webgl, Express,"}
                  delay={0.9}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  text={" and MongoDB to create and build my projects."}
                  delay={1}
                  duration={0.5}
                  speed={0.05}
                />
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

const TimeComponent = () => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <WordSplit text={`(${time})`} duration={0.5} delay={0.1} speed={0.05} />
  );
};

export default App;
