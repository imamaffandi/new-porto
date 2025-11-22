import React, { useEffect, useState, useRef } from "react";
import { ReactLenis } from "lenis/react";

import "./Projects.css";
import { Preview } from "../../components";
import { previewProject } from "../../utils/constant";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [archiveList, setArchiveList] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        const initialSet = Array(120)
            .fill()
            .flatMap((_, i) =>
                previewProject.map((archive, j) => ({
                    ...archive,
                    name: `${archive.name}`,
                    id: i * previewProject.length + j,
                }))
            );
        setArchiveList(initialSet);
    }, []);

    useEffect(() => {
        if (containerRef.current && archiveList.length > 0) {
            ScrollTrigger.create({
                scroller: containerRef.current,
                start: 0,
                end: "max",
                onLeave: (self) => {
                    self.scroll(1);
                    ScrollTrigger.update();
                },
                onLeaveBack: (self) => {
                    self.scroll(ScrollTrigger.maxScroll(containerRef.current) - 1);
                    ScrollTrigger.update();
                },
            });

            const archiveItems =
                containerRef.current.querySelectorAll(".archive-item");
            archiveItems.forEach((item) => {
                gsap.to(item, {
                    repeat: 1,
                    yoyo: true,
                    ease: "none",
                    scrollTrigger: {
                        scroller: containerRef.current,
                        trigger: item,
                        start: "center bottom",
                        end: "center top",
                        scrub: true,
                    },
                });
            });
        }
    }, [archiveList]);

    return (
        <ReactLenis root>
            <div
                className="archive"
                ref={containerRef}
                style={{
                    height: "100vh",
                    top: "-25em",
                    //  overflowY: "auto"
                    // to enable infinite scrolling, uncomment `overflowY: "auto"` and remove the <ReactLenis root> component from root
                }}
            >
                <div className="container">
                    <div className="overlay"></div>
                    <Preview />
                    {archiveList.map((archive) => (
                        <div className="row px-2" key={archive.id}>
                            <div className="archive-item">
                                <div className="archive-details ">
                                    <h1 id="archive-name" className="text-xl font-light tracking-wider font-head">{archive.title}</h1>
                                    <p id="archive-category" className="text-xs tracking-widest font-body">{archive.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ReactLenis>
    );
};

export default Projects;
