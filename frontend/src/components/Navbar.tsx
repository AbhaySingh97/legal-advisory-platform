'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Scale, Menu, X, MessageSquare, BookOpen, Gavel, FileText, ArrowLeft } from 'lucide-react'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const router = useRouter()

    const navLinks = [
        { href: '/', label: 'Home', icon: null },
        { href: '/chatbot', label: 'Chatbot', icon: MessageSquare },
        { href: '/library', label: 'Library', icon: BookOpen },
        { href: '/cases', label: 'Cases', icon: Gavel },
        { href: '/procedures', label: 'Procedures', icon: FileText },
    ]

    return (
        <nav className="bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
            <div className="container-custom">
                <div className="flex justify-between items-center h-16">
                    {/* Logo & Back Button */}
                    <div className="flex items-center gap-4">
                        {pathname !== '/' && (
                            <button
                                onClick={() => router.back()}
                                className="p-2 text-gray-300 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                aria-label="Go back"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                        )}
                        <Link href="/" className="flex items-center space-x-2 font-display font-bold text-xl text-primary-400">
                            <Scale className="w-8 h-8" />
                            <span className="hidden sm:inline">Legal Advisory</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="flex items-center space-x-1 text-gray-300 hover:text-white transition-colors font-medium"
                            >
                                {link.icon && <link.icon className="w-4 h-4" />}
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t animate-slide-down">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
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
