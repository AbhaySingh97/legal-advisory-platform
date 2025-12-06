'use client'

import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // Prevent SSR mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
            {/* Sun Icon (visible in dark mode) */}
            <Sun
                className={`w-5 h-5 text-yellow-500 transition-all duration-300 ${theme === 'dark'
                        ? 'rotate-0 scale-100 opacity-100'
                        : 'rotate-90 scale-0 opacity-0 absolute'
                    }`}
            />

            {/* Moon Icon (visible in light mode) */}
            <Moon
                className={`w-5 h-5 text-gray-700 transition-all duration-300 ${theme === 'light'
                        ? 'rotate-0 scale-100 opacity-100'
                        : '-rotate-90 scale-0 opacity-0 absolute'
                    }`}
            />
        </button>
    )
}
