import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { pdf } from '../assets'
import { SplitText } from '../components'
const Float = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const border1Ref = useRef(null); // First border (description paragraph)
    const border2Ref = useRef(null); // Social links container
    const border3Ref = useRef(null); // Email link
    const borderTopRef = useRef(null); // Top border (list items)
    const cvSvgRef = useRef(null); // CV download SVG

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    // Animate borders to appear after text animations
    useEffect(() => {
        // Calculate when each text animation completes
        // First border: delay 1.4 + duration 0.8 = 2.2
        // Social links: delay 2.6 + duration 0.8 = 3.4 (last social link)
        // Email: delay 2.7 + duration 0.8 = 3.5

        const tl = gsap.timeline();

        // First border appears after description text (delay 1.4 + duration 0.8)
        if (border1Ref.current) {
            gsap.set(border1Ref.current, { scaleX: 0, transformOrigin: 'left' });
            tl.to(border1Ref.current, {
                scaleX: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, 2.2);
        }

        // Social links borders appear after their text animations
        if (border2Ref.current) {
            const socialBorders = border2Ref.current.querySelectorAll('.animated-border');
            gsap.set(socialBorders, { scaleX: 0, transformOrigin: 'left' });
            socialBorders.forEach((border, index) => {
                const delay = 2.4 + index * 0.1 + 0.8; // text delay + stagger + duration
                tl.to(border, {
                    scaleX: 1,
                    duration: 0.4,
                    ease: 'power2.out'
                }, delay);
            });
        }

        // Email border appears after email text
        if (border3Ref.current) {
            const emailBorder = border3Ref.current.querySelector('.animated-border');
            if (emailBorder) {
                gsap.set(emailBorder, { scaleX: 0, transformOrigin: 'left' });
                tl.to(emailBorder, {
                    scaleX: 1,
                    duration: 0.6,
                    ease: 'power2.out'
                }, 3.5);
            }
        }

        // Top border appears after last list item text (delay 2.2 + duration 0.8 = 3.0)
        if (borderTopRef.current) {
            gsap.set(borderTopRef.current, { scaleX: 0, transformOrigin: 'left' });
            tl.to(borderTopRef.current, {
                scaleX: 1,
                duration: 0.6,
                ease: 'power2.out'
            }, 3.0);
        }

        // CV SVG appears after "Download my CV" text (delay 2.3 + duration 0.8 = 3.1)
        if (cvSvgRef.current) {
            gsap.set(cvSvgRef.current, { opacity: 0, scale: 0 });
            tl.to(cvSvgRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)'
            }, 3.1);
        }
    }, []);

    const skills = [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind",
        "GSAP",
        "Framer Motion",
        "Three.js",
        "WebGL",
        "Node.js",
        "Express",
        "MongoDB",
        "Vercel",
        "Git",
        "Figma"
    ];

    return (
        <>
            {/* Toggle Button - Only visible on mobile */}
            <button
                onClick={toggleVisibility}
                className='fixed md:hidden bottom-4 right-4 z-[60] bg-light text-dark p-1 rounded-full shadow-lg border border-dark/20 hover:bg-dark/5 transition-colors'
                aria-label={isVisible ? 'Hide info' : 'Show info'}
            >
                {isVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                    </svg>
                )}
            </button>

            {/* Float Panel */}
            <div className={`fixed md:bg-transparent bg-light text-dark right-0 top-0 z-40 w-full md:w-72 h-screen p-2 flex flex-col items-center justify-between transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                }`}>
                <div className='space-y-2 md:space-y-4'>
                    <SplitText
                        as='h1'
                        text='Imam Affandi | Creative Developer'
                        type='words'
                        stagger={0.03}
                        fromY={24}
                        duration={0.8}
                        delay={1.2}
                        className='font-head w-full tracking-wider'
                    />
                    <div className='w-full pb-2 text-justify font-body text-xs tracking-widest'>
                        <SplitText
                            as='p'
                            text='Independent creative developer based in Malang, Indonesia. I have more than 4 years of experience. Focus on web motion and interactions.'
                            type='words'
                            stagger={0.03}
                            fromY={24}
                            duration={0.8}
                            delay={1.4}
                            className='w-full'
                        />
                        <div ref={border1Ref} className='border-b border-b-dark/50 mt-2'></div>
                    </div>
                    <div className="w-full font-body font-semibold tracking-widest text-justify">
                        <p>
                            {skills.map((skill, index) => (
                                <span
                                    key={index}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className={`inline-block mr-2 transition-all duration-300 cursor-default ${hoveredIndex !== null && hoveredIndex !== index ? 'blur-[2px]' : ''
                                        }`}
                                >
                                    <SplitText
                                        as="span"
                                        text={skill}
                                        type="chars"
                                        stagger={0.03}
                                        fromY={24}
                                        duration={0.8}
                                        delay={1.8}
                                    />
                                </span>
                            ))}
                        </p>
                    </div>
                    <SplitText
                        as='p'
                        text='"I do something that satisfy my clients and satisfy myself"'
                        type='words'
                        stagger={0.03}
                        fromY={24}
                        duration={0.8}
                        delay={1.9}
                        className='w-full italic text-justify font-body text-xs tracking-widest'
                    />
                    <div className='relative pt-2'>
                        <div ref={borderTopRef} className='border-t border-t-dark/50 absolute top-0 left-0 w-full'></div>
                        <ul className='space-y-1'>
                            <li className='text-xs font-body tracking-widest'>
                                <SplitText
                                    as="span"
                                    text="• Specialized in GSAP, WebGL, and web interactions"
                                    type="words"
                                    stagger={0.03}
                                    fromY={24}
                                    duration={0.8}
                                    delay={2}
                                />
                            </li>
                            <li className='text-xs font-body tracking-widest'>
                                <SplitText
                                    as="span"
                                    text="• Focused on visuals with smooth, optimized performance"
                                    type="words"
                                    stagger={0.03}
                                    fromY={24}
                                    duration={0.8}
                                    delay={2.1}
                                />
                            </li>
                            <li className='text-xs font-body tracking-widest'>
                                <SplitText
                                    as="span"
                                    text="• Capable of building full-stack features with Node.js & MongoDB"
                                    type="words"
                                    stagger={0.03}
                                    fromY={24}
                                    duration={0.8}
                                    delay={2.2}
                                />
                            </li>
                        </ul>
                    </div>

                    <a href={pdf}
                        download
                        className='text-lg text-justify w-full tracking-widest font-body flex items-center gap-3'>
                        <svg ref={cvSvgRef} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        <SplitText
                            as="span"
                            text="Download my CV"
                            type="words"
                            stagger={0.03}
                            fromY={24}
                            duration={0.8}
                            delay={2.3}
                        />
                    </a>
                </div>
                <section className='space-y-2'>
                    <div ref={border2Ref} className='flex items-start justify-start md:justify-end gap-2'>
                        <a className='text-xs font-body relative' href="https://www.instagram.com/imamaffandeez/" target='_blank'>
                            <SplitText
                                as="span"
                                text="Instagram"
                                type="chars"
                                stagger={0.03}
                                fromY={24}
                                duration={0.8}
                                delay={2.4}
                            />
                            <span className='animated-border absolute bottom-0 left-0 w-full border-b border-b-dark/75'></span>
                        </a>
                        <a className='text-xs font-body relative' href="https://www.linkedin.com/in/imam-affandi-b2ba82290/" target='_blank'>
                            <SplitText
                                as="span"
                                text="Linkedin"
                                type="chars"
                                stagger={0.03}
                                fromY={24}
                                duration={0.8}
                                delay={2.5}
                            />
                            <span className='animated-border absolute bottom-0 left-0 w-full border-b border-b-dark/75'></span>
                        </a>
                        <a className='text-xs font-body relative' href="https://github.com/imamaffandi" target='_blank'>
                            <SplitText
                                as="span"
                                text="Github"
                                type="chars"
                                stagger={0.03}
                                fromY={24}
                                duration={0.8}
                                delay={2.6}
                            />
                            <span className='animated-border absolute bottom-0 left-0 w-full border-b border-b-dark/75'></span>
                        </a>
                    </div>
                    <a ref={border3Ref} className='text-xl font-body relative inline-block' href="mailto:imamaffandi715@gmail.com" target='_blank'>
                        <SplitText
                            as="span"
                            text="imamaffandi715@gmail.com"
                            type="chars"
                            stagger={0.02}
                            fromY={24}
                            duration={0.8}
                            delay={2.7}
                        />
                        <span className='animated-border absolute bottom-0 left-0 w-full border-b border-b-dark/75'></span>
                    </a>
                </section>
            </div>
        </>
    )
}

export default Float