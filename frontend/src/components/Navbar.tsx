'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Scale, Menu, X, MessageSquare, BookOpen, Gavel, FileText, ArrowLeft } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()
    const { t } = useLanguage()

    const navLinks = [
        { href: '/', label: t('nav.home'), icon: null },
        { href: '/chatbot', label: t('nav.chatbot'), icon: MessageSquare },
        { href: '/library', label: t('nav.library'), icon: BookOpen },
        { href: '/cases', label: t('nav.cases'), icon: Gavel },
        { href: '/procedures', label: t('nav.procedures'), icon: FileText },
    ]

    return (
        <nav className="bg-gradient-to-r from-red-900/95 via-red-800/95 to-orange-900/95 dark:from-red-950/95 dark:via-red-900/95 dark:to-orange-950/95 backdrop-blur-md sticky top-0 z-50 border-b border-red-700/30 dark:border-red-800/50 transition-colors duration-300 shadow-lg shadow-red-900/20">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Back Button */}
                    <div className="flex items-center gap-4">
                        {pathname !== '/' && (
                            <button
                                onClick={() => router.back()}
                                className="p-2 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors rounded-full hover:bg-white/10 dark:hover:bg-slate-700/50"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        )}
                        <Link href="/" className="flex items-center space-x-2 font-display font-bold text-xl text-primary-400 dark:text-primary-300">
                            <Scale className="w-8 h-8" />
                            <span className="hidden sm:inline">Legal Advisory</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center space-x-1 text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition-colors font-medium"
                            >
                                {link.icon && <link.icon className="w-4 h-4" />}
                                <span>{link.label}</span>
                            </Link>
                        ))}

                        {/* Theme & Language Toggles */}
                        <div className="flex items-center gap-2">
                            <LanguageToggle />
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile Menu Button & Toggles */}
                    <div className="md:hidden flex items-center gap-2">
                        <LanguageToggle />
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-300 dark:text-gray-400 hover:bg-gray-800/50 dark:hover:bg-slate-700/50 transition-colors"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-white/10 dark:border-slate-700/50 animate-slide-down">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-2 px-4 py-3 text-gray-300 dark:text-gray-400 hover:bg-gray-800/50 dark:hover:bg-slate-700/50 hover:text-white dark:hover:text-white transition-colors"
                            >
                                {link.icon && <link.icon className="w-5 h-5" />}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    )
}
