'use client'

import React, { useEffect, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage()
    const [mounted, setMounted] = useState(false)

    // Prevent SSR mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <div className="w-16 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )
    }

    return (
        <button
            onClick={toggleLanguage}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`Switch to ${language === 'en' ? 'Hindi' : 'English'}`}
        >
            {/* English */}
            <span
                className={`text-sm font-semibold transition-all duration-300 ${language === 'en'
                        ? 'text-primary-600 dark:text-primary-400 scale-110'
                        : 'text-gray-500 dark:text-gray-400 scale-90'
                    }`}
            >
                EN
            </span>

            {/* Separator */}
            <span className="text-gray-400 dark:text-gray-500">|</span>

            {/* Hindi */}
            <span
                className={`text-sm font-semibold transition-all duration-300 ${language === 'hi'
                        ? 'text-primary-600 dark:text-primary-400 scale-110'
                        : 'text-gray-500 dark:text-gray-400 scale-90'
                    }`}
            >
                हिं
            </span>
        </button>
    )
}
