import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Hook for scroll-triggered animations
 * Returns true when element enters viewport
 */
export function useScrollAnimation(options = {}) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once: true, // Animate only once
        margin: "-100px", // Trigger 100px before element enters viewport
        ...options
    })

    return { ref, isInView }
}

/**
 * Hook for parallax scroll effect
 * Returns Y offset based on scroll position
 */
export function useParallax(speed = 0.5) {
    const [offsetY, setOffsetY] = useState(0)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                const scrolled = window.scrollY
                const elementTop = rect.top + scrolled
                const offset = (scrolled - elementTop) * speed
                setOffsetY(offset)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial call

        return () => window.removeEventListener('scroll', handleScroll)
    }, [speed])

    return { ref, offsetY }
}

/**
 * Hook for smooth scroll behavior
 */
export function useSmoothScroll() {
    useEffect(() => {
        // Enable smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth'

        return () => {
            document.documentElement.style.scrollBehavior = 'auto'
        }
    }, [])
}

/**
 * Hook for number counter animation
 */
export function useCounter(end: number, duration = 2000, start = 0) {
    const [count, setCount] = useState(start)
    const [isAnimating, setIsAnimating] = useState(false)

    const animate = () => {
        setIsAnimating(true)
        const startTime = Date.now()
        const startValue = start

        const updateCount = () => {
            const now = Date.now()
            const progress = Math.min((now - startTime) / duration, 1)

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuart)

            setCount(currentCount)

            if (progress < 1) {
                requestAnimationFrame(updateCount)
            } else {
                setIsAnimating(false)
            }
        }

        requestAnimationFrame(updateCount)
    }

    return { count, animate, isAnimating }
}

/**
 * Hook for reduced motion preference
 * Returns true if user prefers reduced motion
 */
export function usePrefersReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handleChange = () => {
            setPrefersReducedMotion(mediaQuery.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    return prefersReducedMotion
}
