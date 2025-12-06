'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        setMounted(true)
        const storedTheme = localStorage.getItem('theme') as Theme | null

        if (storedTheme) {
            setTheme(storedTheme)
            document.documentElement.classList.toggle('dark', storedTheme === 'dark')
        } else {
            // Detect system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            const systemTheme = prefersDark ? 'dark' : 'light'
            setTheme(systemTheme)
            document.documentElement.classList.toggle('dark', systemTheme === 'dark')
        }
    }, [])

    // Listen for system theme changes
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light'
                setTheme(newTheme)
                document.documentElement.classList.toggle('dark', newTheme === 'dark')
            }
        }

        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }

    // Prevent flash of unstyled content
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(ThemeContext)
    // Return null if context is undefined (during SSR or before provider mounts)
    // This allows components to handle the loading state gracefully
    return context || { theme: 'light' as Theme, toggleTheme: () => { } }
}
