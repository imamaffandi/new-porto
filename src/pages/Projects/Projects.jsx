import React, { useEffect, useState, useRef } from "react";
import { ReactLenis } from "lenis/react";

import "./Projects.css";
import { previewProject } from "../../utils/constant";
import { tick } from "../../assets";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [archiveList, setArchiveList] = useState([]);
    const containerRef = useRef(null);
    const previewImgRef = useRef(null);
    const isInitialLoad = useRef(true);
    const [previewImg, setPreviewImg] = useState(null);
    const [centeredIndex, setCenteredIndex] = useState(null);

    // Load projects from constant.js
    useEffect(() => {
        setProjects(previewProject);
        if (previewProject.length > 0) {
            setPreviewImg(previewProject[0]);
        }
    }, []);

    // Generate archive list from projects
    useEffect(() => {
        if (projects.length > 0) {
            const initialSet = Array(120)
                .fill()
                .flatMap((_, i) =>
                    projects.map((archive, j) => ({
                        ...archive,
                        id: i * projects.length + j,
                    }))
                );
            setArchiveList(initialSet);
        }
    }, [projects]);

    // Handle scroll to update preview image
    useEffect(() => {
        if (projects.length === 0 || !previewImg) return;

        const tickSound = new Audio(tick);
        const handleScroll = () => {
            if (!containerRef.current) return;

            // Get viewport center position
            const viewportCenter = window.innerHeight / 2;

            // Get all archive items
            const archiveItems = containerRef.current.querySelectorAll(".row");
            if (archiveItems.length === 0) return;

            // Find which item's center is closest to viewport center
            let closestItem = null;
            let closestDistance = Infinity;

            archiveItems.forEach((item) => {
                const rect = item.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const distance = Math.abs(itemCenter - viewportCenter);

                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestItem = item;
                }
            });

            if (closestItem) {
                // Get the archive data from the item
                const itemIndex = parseInt(closestItem.getAttribute("data-index") || "0");
                const projectIndex = itemIndex % projects.length;
                const selectedPreviewImg = projects[projectIndex];

                // Check if item is centered (within a threshold)
                const rect = closestItem.getBoundingClientRect();
                const itemCenter = rect.top + rect.height / 2;
                const isCentered = Math.abs(itemCenter - viewportCenter) < 50; // 50px threshold

                if (isCentered) {
                    setCenteredIndex(itemIndex);
                } else {
                    setCenteredIndex(null);
                }

                if (selectedPreviewImg && selectedPreviewImg !== previewImg) {
                    setPreviewImg(selectedPreviewImg);
                    tickSound.play();
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Also listen to resize events in case viewport changes
        window.addEventListener("resize", handleScroll);
        // Initial call to set correct preview
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, [previewImg, projects]);

    // Enter animation
    useEffect(() => {
        if (containerRef.current && archiveList.length > 0 && previewImg && isInitialLoad.current) {
            const archiveItems = containerRef.current.querySelectorAll(".archive-item");
            const previewImage = previewImgRef.current;

            // Set initial states
            gsap.set(archiveItems, { opacity: 0, y: 30 });
            if (previewImage) gsap.set(previewImage, { opacity: 0, scale: 0.9 });

            // Create timeline for enter animation
            const tl = gsap.timeline();

            // Animate archive items first with faster stagger
            tl.to(
                archiveItems,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.01,
                    ease: "power2.out",
                },
                0
            );

            // Animate preview image after list animation starts
            if (previewImage) {
                tl.to(
                    previewImage,
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power3.out",
                    },
                    1
                );
            }

            isInitialLoad.current = false;
        }
    }, [archiveList, previewImg]);

    // Animate preview image when it changes (not on initial load)
    useEffect(() => {
        if (previewImgRef.current && !isInitialLoad.current) {
            const previewImage = previewImgRef.current;
            gsap.fromTo(
                previewImage,
                { opacity: 0, scale: 0.95 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.5,
                    ease: "power2.out",
                }
            );
        }
    }, [previewImg]);

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

    if (!previewImg) {
        return null;
    }

    return (
        <ReactLenis root>
            <div
                className="archive text-dark"
                ref={containerRef}
                style={{
                    height: "100vh",
                    top: "-25em",
                    //  overflowY: "auto"
                    // to enable infinite scrolling, uncomment `overflowY: "auto"` and remove the <ReactLenis root> component from root
                }}
            >
                <h1 className='fixed top-1 left-3 block md:hidden font-head z-50'>Imam Affandi | Creative Developer</h1>
                <div className="container">
                    <div className="overlay"></div>
                    {previewImg.img && (
                        <a
                            href={previewImg.link}
                            target="_blank"
                            ref={previewImgRef}
                            className="outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video rounded-lg overflow-hidden opacity-75 md:opacity-100 -z-10 md:z-50"
                        // className="outline-none fixed h-screen w-full top-0 left-0 flex items-center overflow-hidden opacity-75 md:opacity-100 -z-10 md:z-50"
                        >
                            <img src={previewImg.img} alt="currently selected source" className="object-cover w-full h-full" />
                            {/* <img src={previewImg.img} alt="currently selected source" className="object-cover w-1/2 h-full" /> */}
                            {/* <div className="w-1/2 h-screen bg-green-500"></div> */}
                        </a>
                    )}
                    {archiveList.map((archive, index) => (
                        <div className="row px-2" key={archive.id} data-index={index}>
                            <div className="archive-item">
                                {/* <a href={archive.link || "#"} target="_blank" rel="noopener noreferrer"> */}
                                <div className="archive-details ">
                                    <h1
                                        id="archive-name"
                                        className={`text-xl font-light tracking-wider font-head ${centeredIndex === index ? 'centered-text' : ''}`}
                                    >
                                        {archive.title}
                                    </h1>
                                    {/* <p id="archive-category" className="text-xs tracking-widest font-body max-w-2/3">{archive.description}</p> */}
                                </div>
                                {/* </a> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ReactLenis>
    );
};

export default Projects;
