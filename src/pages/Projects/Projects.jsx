import React, { useEffect, useState, useRef } from "react";
import { ReactLenis } from "lenis/react";

import "./Projects.css";
import { previewProject } from "../../utils/constant";
import { tick } from "../../assets";
import { projectAPI } from "../../services/api";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [archiveList, setArchiveList] = useState([]);
    const [loading, setLoading] = useState(true);
    const containerRef = useRef(null);
    const [previewImg, setPreviewImg] = useState(null);

    // Fetch projects from API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data = await projectAPI.getAll();

                // Transform API data to match expected structure
                const transformedProjects = data.map((project) => ({
                    link: project.link || "",
                    img: project.images && project.images.length > 0 ? project.images[0] : "",
                    title: project.name || "",
                    description: project.description || "",
                }));

                // Use API data if available, otherwise fallback to dummy data
                const projectsToUse = transformedProjects.length > 0 ? transformedProjects : previewProject;
                setProjects(projectsToUse);

                // Set default preview image
                if (projectsToUse.length > 0) {
                    setPreviewImg(projectsToUse[0]);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
                // Fallback to dummy data on error
                setProjects(previewProject);
                setPreviewImg(previewProject[0]);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
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

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 animate-spin">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
            </div>
        );
    }

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
                        <a href={previewImg.link} target="_blank" className="outline-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 aspect-video rounded-lg overflow-hidden opacity-75 md:opacity-100 -z-10 md:z-50">
                            <img src={previewImg.img} alt="currently selected source" className="object-cover w-full h-full" />
                        </a>
                    )}
                    {archiveList.map((archive, index) => (
                        <div className="row px-2" key={archive.id} data-index={index}>
                            <div className="archive-item">
                                <a href={archive.link || "#"} target="_blank" rel="noopener noreferrer">
                                    <div className="archive-details ">
                                        <h1 id="archive-name" className="text-xl font-light tracking-wider font-head">{archive.title}</h1>
                                        <p id="archive-category" className="text-xs tracking-widest font-body">{archive.description}</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ReactLenis>
    );
};

export default Projects;
