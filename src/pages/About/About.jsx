import React, { useState, useEffect } from 'react'
import Transition from '../../utils/transition'
import "./About.css"
import { SmoothScroll, SplitText } from '../../components'
import { services, techs } from '../../utils/constant'
import { Link } from 'react-router-dom'
const About = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        var timer = setInterval(() => setTime(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }

    });
    return (
        <div className='w-full'>
            <SmoothScroll />
            {/* Hero */}
            <section className='h-[80dvh] w-full flex flex-col gap-2 justify-end p-3'>
                <div className='w-2/3'>
                    {/* <p className='font-head text-3xl/10 tracking-widest'>IMAM AFFANDI | Passionate Frontend Developer</p> */}
                    <SplitText Tag='p'
                        text={`IMAM AFFANDI | Passionate Frontend Developer`}
                        type='words' // 'chars' | 'words'
                        stagger={0.04}
                        fromY={20}
                        duration={0.6}
                        delay={0}
                        ease='power3.out'
                        scrollTrigger={false}
                        className='font-head text-3xl/10 tracking-widest' />
                    <SplitText Tag='p'
                        text={`Creative front-end developer from Malang, Indonesia. I build interactive, high-performance websites that help brands look sharp and move fast.`}
                        type='words' // 'chars' | 'words'
                        stagger={0.07}
                        fromY={0}
                        duration={1.3}
                        delay={.2}
                        ease='power3.out'
                        scrollTrigger={true}
                        className='text-xs tracking-wider text-gray-500 font-body' />
                    {/* <p className='text-xs tracking-wider text-gray-500 font-body'>Creative front-end developer from Malang, Indonesia.
                        I build interactive, high-performance websites that help brands look sharp and move fast.</p> */}
                </div>
            </section>
            {/* About */}
            <section className='p-5 w-full h-screen bg-black flex items-start gap-3'>
                <div className='w-1/2'>
                    <p className='text-gray-500 text-justify text-5xl tracking-wider font-body pb-3'>Every project I take on aims to solve a real problem: <span className='font-head font-bold tracking-widest text-accent'>improve brand identity</span>, enhance <span className='font-head font-bold tracking-widest text-accent'>user experience</span>, or make digital <span className='font-head font-bold tracking-widest text-accent'>interactions smoother</span> .</p>
                    <Link to={'/projects'} className='border border-white rounded-full bg-none text-white font-body text-xs w-28 h-12 flex justify-center items-center gap-2 hover:shadow'>Projects <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                    </svg>
                    </Link>
                </div>
                {/* <img src="https://picsum.photos/200/300" alt="" className='w-1/2 h-3/4 object-cover' /> */}
            </section>
            {/* Services & Techs */}
            <section className='p-5 w-full min-h-screen bg-black flex justify-end items-start'>
                <div className='w-3/4 flex flex-col '>
                    {services.map((service, index) => {
                        return (
                            <SplitText key={index} Tag='p'
                                text={`${service.title}`}
                                type='words' // 'chars' | 'words'
                                stagger={0.04}
                                fromY={20}
                                duration={0.8}
                                delay={0}
                                ease='power3.out'
                                scrollTrigger={true}
                                className='border-b border-white font-body text-white text-2xl text-end pt-5' />
                        )
                    })}
                </div>
            </section>
            <section className='w-full bg-black '>
                <div className='w-full px-2 flex items-center justify-between gap-3'>
                    {techs.map((tech, index) => {
                        return (
                            <SplitText key={index} Tag='p'
                                text={`${tech.name}`}
                                type='chars' // 'chars' | 'words'
                                stagger={0.04}
                                fromY={0}
                                duration={0.2}
                                delay={0.5}
                                ease='power3.out'
                                scrollTrigger={true}
                                className='font-body cursor-pointer text-white text-sm text-start' />
                        )
                    })}
                </div>
            </section>

            {/* Footer */}
            <section className="footer" data-scroll-section>
                <div className="footer-copy">
                    <div className="footer-copy-h1">
                        <a href="#">
                            <h1>Contact</h1>
                        </a>
                    </div>
                    <div className="footer-copy-text">
                        <p>Digital creative studio</p>
                        <br />
                        <p><a href="#">Whatsapp</a> • <a href="#">Instagram</a> • <a href="#">LinkedIn</a></p>
                        <br />
                        <p>Malang, Indonesia {time.toLocaleTimeString()}</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Transition(About)