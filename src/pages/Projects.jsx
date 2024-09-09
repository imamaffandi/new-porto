import { useState } from "react";
import { projects } from "../constant/constant";
import { SectionWrapper } from "../HOC";
import { motion } from "framer-motion";
import { container, itemLeft } from "../utils/motion";

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
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          className="w-full flex-col justify-between items-center divide-y-2  pt-20"
        >
          {projects.map((project) => {
            return (
              <motion.div
                variants={itemLeft}
                key={project.index}
                className=" flex justify-between items-center h-20 relative"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHoveredIndex(project.index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                {hoveredIndex === project.index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
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
                  </motion.div>
                )}

                <div className="flex justify-between items-center w-full  ">
                  <p className="text-dark montserrat text-xl tracking-wide">
                    {" "}
                    {project.name}
                  </p>{" "}
                  <div className="flex gap-5">
                    <a
                      href={project.source}
                      target="_blank"
                      className="hover:text-accent cursor-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
                        />
                      </svg>
                    </a>

                    <a
                      href={project.preview}
                      target="_blank"
                      className="hover:text-accent cursor-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
