import { useState } from "react";
import { projects } from "../constant/constant";
import { SectionWrapper } from "../HOC";
import { gsap } from "gsap";
const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    setPosition({ x, y });
  }

  return (
    <>
      <section className="px-10 ">
        <div className="w-full flex-col justify-between items-center divide-y-2 pt-40">
          {projects.map((project) => {
            return (
              <div
                key={project.name}
                className=" flex justify-between hover:text-light items-center h-20 relative group"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHoveredIndex(project.index)}
                onMouseLeave={() => setHoveredIndex(-1)}
                onClick={() => window.open(project.preview, "_blank")}
              >
                <div className="w-0 -z-0 bg-dark absolute h-full transition-all duration-500 group-hover:w-full"></div>
                {hoveredIndex === project.index && (
                  <div
                    className="overflow-hidden rounded-md"
                    style={{
                      position: "fixed",
                      left:
                        position.x > window.innerWidth / 2
                          ? position.x - 224
                          : position.x + 16,
                      top: position.y,
                    }}
                    key={project.index}
                  >
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-56 h-32 object-cover "
                    />
                  </div>
                )}
                <div className="flex justify-between items-center w-full ">
                  <p className="z-10 transition-all duration-500 montserrat text-5xl cursor-none tracking-wide">
                    {project.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
