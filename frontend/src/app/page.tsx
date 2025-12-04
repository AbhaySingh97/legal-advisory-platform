import Link from 'next/link'
import { Scale, MessageSquare, BookOpen, Gavel, FileText, TrendingUp } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-bg text-white py-20 md:py-32">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in">
                        <div className="flex justify-center mb-6">
                            <Scale className="w-16 h-16 md:w-20 md:h-20" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                            Your Complete Legal Advisory Platform
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-white/90">
                            Navigate Indian Constitution, Case Laws, and Legal Procedures with AI-Powered Guidance
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/chatbot" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                                <MessageSquare className="inline-block w-5 h-5 mr-2" />
                                Start Chatbot
                            </Link>
                            <Link href="/library" className="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
                                <BookOpen className="inline-block w-5 h-5 mr-2" />
                                Explore Library
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        Comprehensive Legal Resources
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 gradient-bg text-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <StatCard number="100+" label="Constitution Articles" />
                        <StatCard number="15+" label="Landmark Cases" />
                        <StatCard number="10+" label="Legal Procedures" />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="container-custom">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
                        How It Works
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
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
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-primary-50">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Start exploring Indian constitutional law with our comprehensive platform.
                    </p>
                    <Link href="/chatbot" className="btn-primary inline-flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Launch Chatbot
                    </Link>
                </div>
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
        <Link href={href} className="card group cursor-pointer">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xl font-bold mb-3 group-hover:text-primary-600 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600">{description}</p>
        </Link>
    )
}

function StatCard({ number, label }: { number: string; label: string }) {
    return (
        <div className="animate-fade-in">
            <div className="text-5xl md:text-6xl font-bold mb-2">{number}</div>
            <div className="text-xl text-white/90">{label}</div>
        </div>
    )
}

function StepCard({ number, title, description }: {
    number: string
    title: string
    description: string
}) {
    return (
        <div className="text-center">
            <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                {number}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}
