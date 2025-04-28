import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { socialMedia, projects } from "./constant/constant";
import { CharSplit, WordSplit, LineSplit } from "./components/Split";
import { Carousel } from "./components";
import { gsap } from "gsap";

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
        {/* Navbar */}
        <nav className="flex text-dark pt-2 justify-between items-center px-16 fixed top-0 w-full z-50">
          <a className="text-xs tracking-wider font-semibold" href="">
            <WordSplit
              text={"imamaffandi715@gmail.com"}
              duration={0.2}
              delay={0.1}
              speed={0.009}
            />
          </a>
          <section>
            <p className="flex items-center gap-1 sf-thin text-xs">
              Indonesia
              <span className="flex gap-1 items-center">
                <TimeComponent />
              </span>
            </p>
            <div className="flex items-center gap-2">
              {" "}
              {socialMedia.map((social, index) => (
                <a href={social.link} target="_blank" key={social.name}>
                  <WordSplit
                    text={social.name}
                    className={"font-light tracking-tight text-xs opacity-80"}
                    duration={0.5}
                    delay={0.8 + index * 0.2}
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
            {/* Project */}
            <section className="relative w-full h-screen overflow-hidden">
              <Carousel projects={projects} />
            </section>
            {/* Jumbotron */}
            <section>
              <CharSplit
                text={"Developer && Freelancer"}
                className={
                  "absolute text-4xl font-bold w-full text-dark sf bottom-0 left-0"
                }
                delay={1}
                duration={0.5}
                speed={0.03}
              />
            </section>
            {/* About */}
            <section className="absolute right-0 top-32">
              <div className="w-72">
                <LineSplit
                  className={
                    "text-xs text-justify tracking-wide sf font-light text-dark opacity-80 after:absolute after:w-full after:top-5 after:h-20"
                  }
                  text={"I'm Imam Affandi. Born in Malang, Indonesia."}
                  delay={1}
                  duration={0.5}
                  speed={0.05}
                />

                <LineSplit
                  className={
                    "text-xs text-justify tracking-wide sf font-light text-dark opacity-80"
                  }
                  text={"I am a creative Fullstack web developer."}
                  delay={1.1}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  className={
                    "text-xs text-justify tracking-wide sf font-light text-dark opacity-80"
                  }
                  text={"I love to create engaging, creative,"}
                  delay={1.2}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  className={
                    "text-xs text-justify tracking-wide sf font-light text-dark opacity-80"
                  }
                  text={" and interactive websites."}
                  delay={1.3}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  className={
                    "text-xs text-justify tracking-wide sf font-light text-dark opacity-80"
                  }
                  text={"I usually use React, Node, Webgl, Express,"}
                  delay={1.4}
                  duration={0.5}
                  speed={0.05}
                />
                <LineSplit
                  className={
                    "text-xs text-justify tracking-wide sf font-light text-dark opacity-80"
                  }
                  text={" and MongoDB to create and build my projects."}
                  delay={1.5}
                  duration={0.5}
                  speed={0.05}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

const TimeComponent = () => {
  const [time, setTime] = useState(
    new Date()
      .toLocaleTimeString("en-US", {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(/ /, "")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(
        new Date()
          .toLocaleTimeString("en-US", {
            timeZone: "Asia/Jakarta",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
          .replace(/ /, "")
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span className="sf">({time})</span>;
};

export default App;
