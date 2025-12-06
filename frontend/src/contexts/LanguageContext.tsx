'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Language = 'en' | 'hi'

interface LanguageContextType {
    language: Language
    toggleLanguage: () => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguage] = useState<Language>('en')
    const [mounted, setMounted] = useState(false)
    const [translations, setTranslations] = useState<Record<string, any>>({})

    // Initialize language from localStorage or browser preference
    useEffect(() => {
        setMounted(true)
        const storedLanguage = localStorage.getItem('language') as Language | null

        if (storedLanguage) {
            setLanguage(storedLanguage)
        } else {
            // Detect browser language
            const browserLang = navigator.language.toLowerCase()
            const detectedLang = browserLang.startsWith('hi') ? 'hi' : 'en'
            setLanguage(detectedLang)
        }
    }, [])

    // Load translations when language changes
    useEffect(() => {
        const loadTranslations = async () => {
            try {
                const translations = await import(`@/translations/${language}.json`)
                setTranslations(translations.default)
            } catch (error) {
                console.error('Failed to load translations:', error)
            }
        }
        loadTranslations()
    }, [language])

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'hi' : 'en'
        setLanguage(newLanguage)
        localStorage.setItem('language', newLanguage)
    }

    // Translation function with nested key support
    const t = (key: string): string => {
        const keys = key.split('.')
        let value: any = translations

        for (const k of keys) {
            if (value && typeof value === 'object') {
                value = value[k]
            } else {
                return key // Return key if translation not found
            }
        }

        return typeof value === 'string' ? value : key
    }

    // Prevent flash of untranslated content
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    // Return default values if context is undefined (during SSR)
    return context || { language: 'en' as Language, toggleLanguage: () => { }, t: (key: string) => key }
}
