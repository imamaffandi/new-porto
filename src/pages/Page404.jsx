import React, { useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const Page404 = () => {
    const containerRef = useRef(null)

    useGSAP(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
            tl.from('.code', { y: 40, opacity: 0, scale: 0.9, duration: 0.9 })
                .from('.headline', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
                .from('.sub', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
                .from('.cta', { y: 10, opacity: 0, duration: 0.5, stagger: 0.08 }, '-=0.4')

            gsap.to('.floaty', {
                yPercent: 8,
                rotate: 2,
                duration: 3.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            })
        }, containerRef)
        return () => ctx.revert()
    }, [])

    return (
        <section ref={containerRef} className="min-h-screen grid place-items-center bg-light text-gray-600 px-6">
            <div className="text-center">
                <div className="relative inline-block mb-2">
                    <span className="code floaty block text-[20vw] leading-none font-semibold tracking-tight text-gray-600/10 select-none">404</span>
                    <span aria-hidden className="pointer-events-none absolute inset-0 code block text-[20vw] leading-none font-semibold tracking-tight text-gray-600/15 blur-[2px]"></span>
                </div>
                <h1 className="headline text-2xl md:text-3xl font-semibold mb-2">Page not found</h1>
                <p className="sub text-base md:text-lg text-gray-600/70 mb-6 max-w-xl mx-auto">The page you are looking for might have been removed, renamed, or is temporarily unavailable.</p>
                <div className="flex items-center justify-center gap-3">
                    <Link to="/" className="cta inline-flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-light hover:bg-gray-600/90 transition-colors">Go Home</Link>
                    <Link to="/projects" className="cta inline-flex items-center gap-2 rounded-md border border-gray-600/20 px-4 py-2 hover:bg-gray-600/5 transition-colors">See Projects</Link>
                </div>
            </div>
        </section>
    )
}

export default Page404