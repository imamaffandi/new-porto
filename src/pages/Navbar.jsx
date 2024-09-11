import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { links } from "../constant/constant";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const navlink = useRef(null);
  const navmain = useRef(null);
  const navinfo = useRef(null);
  const navtime = useRef(null);
  const handleClick = (e, target) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: target, offsetY: 50 },
      ease: "power2.inOut",
    });
  };
  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .fromTo(
        navlink.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
      )
      .fromTo(
        navmain.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        navinfo.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      )
      .fromTo(
        navtime.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        "-=0.3"
      );
  }, []);
  return (
    <nav className="flex helvetica mix-blend-difference bg-transparent text-white font-thin pt-2 justify-between items-start px-3 fixed top-0 left-0 right-0 z-50">
      <ul className="flex flex-col">
        {links.map((link, index) => (
          <li
            key={link.name}
            className="hover:text-accent"
            ref={(el) => {
              if (navlink.current === null) navlink.current = [];
              navlink.current[index] = el;
            }}
          >
            <a
              href={`#${link.link}`}
              className="cursor-none"
              onClick={(e) => handleClick(e, `#${link.link}`)}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
      <div ref={navmain}>
        <p>Imam Affandi</p>
      </div>
      <div ref={navinfo}>
        <p>Developer | Designer | Freelancer</p>
        <p ref={navtime}>
          Indonesia (
          {(() => {
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

            return time;
          })()}
          )
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
