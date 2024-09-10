import { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { links } from "../constant/constant";

gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const handleClick = (e, target) => {
    e.preventDefault();
    gsap.to(window, {
      duration: 0.5,
      scrollTo: { y: target, offsetY: 50 },
      ease: "power2.inOut",
    });
  };

  return (
    <nav className="flex helvetica bg-transparent text-dark pt-2 justify-between items-start px-3 fixed top-0 left-0 right-0 z-50">
      <ul className="flex flex-col">
        {links.map((link) => (
          <li key={link.name} className="hover:text-accent ">
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
      <div>
        <p>Imam Affandi</p>
      </div>
      <div>
        <p>Developer | Designer | Freelancer</p>
        <p>
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
