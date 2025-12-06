'use client'

import React from 'react'

interface AnimatedCounterProps {
    end: number
    duration?: number
    suffix?: string
    prefix?: string
}

export default function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: AnimatedCounterProps) {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        let startTime: number
        let animationFrame: number

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)

            setCount(Math.floor(progress * end))

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate)
            }
        }

        animationFrame = requestAnimationFrame(animate)

        return () => cancelAnimationFrame(animationFrame)
    }, [end, duration])

    return (
        <span className="font-bold text-4xl md:text-5xl text-white">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    )
}
