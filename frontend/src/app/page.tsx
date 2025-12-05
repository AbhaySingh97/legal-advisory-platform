'use client'

import Link from 'next/link'
import { Scale, MessageSquare, BookOpen, Gavel, FileText, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function HomePage() {
    return (
        <div className="min-h-screen relative">
            {/* Background Image for entire page */}
            <div className="fixed inset-0 z-0">
                <img
                    src="/supreme-court.png"
                    alt="Supreme Court of India"
                    className="w-full h-full object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-gray-900/90 to-gray-900/95"></div>
            </div>

            {/* Hero Section */}
            <section className="relative text-white py-20 md:py-32 z-10">
                <div className="container-custom">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                    >
                        <div className="flex justify-center mb-6">
                            <Scale className="w-16 h-16 md:w-20 md:h-20" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Your Complete Legal Advisory Platform
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90">
                            Navigate Indian Constitution, Case Laws, and Legal Procedures with AI-Powered Guidance
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto px-4 sm:px-0">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/chatbot" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                                    <MessageSquare className="inline-block w-5 h-5 mr-2" />
                                    Start Chatbot
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link href="/library" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                                    <BookOpen className="inline-block w-5 h-5 mr-2" />
                                    Explore Library
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 relative z-10">
                <div className="container-custom">
                    <motion.h2
                        className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Comprehensive Legal Resources
                    </motion.h2>
                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                    >
                        <FeatureCard
                            icon={<MessageSquare className="w-12 h-12 text-primary-600" />}
                            title="AI-Powered Chatbot"
                            description="Get instant answers to your legal queries with our intelligent chatbot trained on Indian Constitution and laws."
                            href="/chatbot"
                        />
                        <FeatureCard
                            icon={<BookOpen className="w-12 h-12 text-primary-600" />}
                            title="Legal Library"
                            description="Browse through 100+ articles of the Indian Constitution with detailed descriptions and categorization."
                            href="/library"
                        />
                        <FeatureCard
                            icon={<Gavel className="w-12 h-12 text-primary-600" />}
                            title="Landmark Cases"
                            description="Explore landmark judgments that shaped Indian constitutional law with detailed analysis."
                            href="/cases"
                        />
                        <FeatureCard
                            icon={<FileText className="w-12 h-12 text-primary-600" />}
                            title="Legal Procedures"
                            description="Step-by-step guides for various legal procedures including PIL, RTI, and more."
                            href="/procedures"
                        />
                        <FeatureCard
                            icon={<TrendingUp className="w-12 h-12 text-primary-600" />}
                            title="Advanced Search"
                            description="Powerful search capabilities to find relevant articles, cases, and procedures quickly."
                            href="/library"
                        />
                        <FeatureCard
                            icon={<Scale className="w-12 h-12 text-primary-600" />}
                            title="Legal Rights Guide"
                            description="Understand your fundamental rights, duties, and constitutional protections."
                            href="/library?category=Fundamental%20Rights"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 relative z-10">
                <div className="container-custom">
                    <motion.div
                        className="grid md:grid-cols-3 gap-8 text-center"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <StatCard number="100+" label="Constitution Articles" />
                        <StatCard number="15+" label="Landmark Cases" />
                        <StatCard number="10+" label="Legal Procedures" />
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 relative z-10">
                <div className="container-custom">
                    <motion.h2
                        className="text-3xl md:text-4xl font-display font-bold text-center mb-12 text-white"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        How It Works
                    </motion.h2>
                    <motion.div
                        className="grid md:grid-cols-3 gap-8"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                    >
                        <StepCard
                            number="1"
                            title="Ask Your Question"
                            description="Type your legal query in the chatbot or browse our comprehensive library."
                        />
                        <StepCard
                            number="2"
                            title="Get AI-Powered Answers"
                            description="Receive instant, accurate responses based on Indian Constitution and case laws."
                        />
                        <StepCard
                            number="3"
                            title="Explore Related Resources"
                            description="Discover related articles, cases, and procedures for deeper understanding."
                        />
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 relative z-10">
                <motion.div
                    className="container-custom text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                        Start exploring Indian constitutional law with our comprehensive platform.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link href="/chatbot" className="btn-primary inline-flex items-center">
                            <MessageSquare className="w-5 h-5 mr-2" />
                            Launch Chatbot
                        </Link>
                    </motion.div>
                </motion.div>
            </section>
        </div>
    )
}

function FeatureCard({ icon, title, description, href }: {
    icon: React.ReactNode
    title: string
    description: string
    href: string
}) {
    return (
        <motion.div variants={fadeInUp}>
            <Link href={href} className="block">
                <motion.div
                    className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg p-6 h-full transition-all duration-300"
                    whileHover={{ y: -8, scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
                    transition={{ duration: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
                >
                    <div className="mb-4">{icon}</div>
                    <h3 className="text-xl font-bold mb-3 text-white">
                        {title}
                    </h3>
                    <p className="text-gray-300">{description}</p>
                </motion.div>
            </Link>
        </motion.div>
    )
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <motion.div variants={fadeInUp}>
            <div className="text-5xl md:text-6xl font-bold mb-2 text-white">{number}</div>
            <div className="text-xl text-gray-300">{label}</div>
        </motion.div>
    )
}

function StepCard({ number, title, description }: {
    number: string
    title: string
    description: string
}) {
    return (
        <motion.div
            className="text-center"
            variants={fadeInUp}
        >
            <motion.div
                className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {number}
            </motion.div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-300">{description}</p>
        </motion.div>
    )
}
