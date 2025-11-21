import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SplitText = ({
    as: Tag = 'p',
    text = '',
    type = 'chars', // 'chars' | 'words'
    stagger = 0.04,
    fromY = 20,
    duration = 0.8,
    delay = 0,
    ease = 'power3.out',
    className = '',
    scrollTrigger = false, // Enable/disable ScrollTrigger
}) => {
    const containerRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const targets = containerRef.current?.querySelectorAll('.split-unit') || []
            gsap.set(targets, { y: fromY, opacity: 0 })

            const animationConfig = {
                y: 0,
                opacity: 1,
                duration,
                ease,
                stagger,
                delay,
            }

            // Add ScrollTrigger if enabled
            if (scrollTrigger) {
                animationConfig.scrollTrigger = {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }

            gsap.to(targets, animationConfig)
        }, containerRef)

        return () => ctx.revert()
    }, [stagger, fromY, duration, delay, ease, text, type, scrollTrigger])

    const renderUnits = () => {
        if (type === 'words') {
            const words = text.split(' ')
            return words.map((word, index) => (
                <React.Fragment key={index}>
                    <span className="split-unit inline-block will-change-transform">{word}</span>
                    {index < words.length - 1 ? ' ' : null}
                </React.Fragment>
            ))
        }

        return Array.from(text).map((ch, index) => (
            <span key={index} className="split-unit inline-block will-change-transform">
                {ch === ' ' ? '\u00A0' : ch}
            </span>
        ))
    }

    return (
        <Tag ref={containerRef} className={className}>
            {renderUnits()}
        </Tag>
    )
}

export default SplitText


