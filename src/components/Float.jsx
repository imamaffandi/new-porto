import React, { useState } from 'react'
import { pdf } from '../assets'
const Float = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

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
            <div className={`fixed md:bg-transparent bg-light text-dark right-0 top-0 z-50 w-full md:w-72 h-screen p-2 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isVisible ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
                }`}>
                <div className='space-y-2'>
                    <h1 className='font-head w-full tracking-wider'>Imam Affandi | Creative Developer</h1>
                    <p className='w-full border-b border-b-dark/50 pb-2 text-justify font-body text-xs tracking-widest'>Independent creative developer based in Malang, Indonesia. I have more than 4 years of experience. Focus on web motion and interactions.</p>
                    <p className="w-full font-body font-semibold tracking-widest text-justify">
                        React, Next.js, TypeScript,
                        Tailwind, GSAP, Framer Motion,
                        Three.js / WebGL,
                        Node.js, Express, MongoDB,
                        Vercel, Git, Figma
                    </p>
                    <p className='w-full italic text-justify font-body text-xs tracking-widest'>
                        I bring ideas to life through animation, interaction, and detail-oriented
                        frontend craft.
                    </p>
                    <ul className='space-y-1 pt-2 border-t border-t-dark/50'>
                        <li className='text-xs font-body tracking-widest'>
                            • Specialized in GSAP, WebGL, and motion-driven user experiences
                        </li>
                        <li className='text-xs font-body tracking-widest'>
                            • Focused on high-impact visuals with smooth, optimized performance
                        </li>
                        <li className='text-xs font-body tracking-widest'>
                            • Capable of building full-stack features with Node.js & MongoDB
                        </li>
                    </ul>

                    <a href={pdf}
                        download
                        className='text-lg text-justify w-full tracking-widest font-body flex items-center gap-3'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download my CV
                    </a>
                </div>
                <section className='space-y-2'>
                    <div className='flex items-start justify-start md:justify-end gap-2'>
                        <a className='text-xs font-body border-b border-b-dark/75' href="https://www.instagram.com/imamaffandeez/" target='_blank'>Instagram</a>
                        <a className='text-xs font-body border-b border-b-dark/75' href="https://www.linkedin.com/in/imam-affandi-b2ba82290/" target='_blank'>Linkedin</a>
                        <a className='text-xs font-body border-b border-b-dark/75' href="https://github.com/imamaffandi" target='_blank'>Github</a>
                    </div>
                    <a className='text-xl font-body border-b border-b-dark/75' href="mailto:imamaffandi715@gmail.com" target='_blank'>imamaffandi715@gmail.com</a>
                </section>
            </div>
        </>
    )
}

export default Float