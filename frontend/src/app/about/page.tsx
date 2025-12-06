import React from 'react'
import { ExternalLink } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in duration-500">
                <div className="p-8 md:p-12 text-center">
                    {/* Profile Avatar */}
                    <div className="flex flex-col items-center">
                        <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
                            <span className="text-4xl font-bold text-white">AS</span>
                        </div>

                        <h1 className="text-3xl font-display font-bold mb-2">Abhay Singh Chauhan</h1>
                        <p className="text-gray-600 text-sm uppercase tracking-wider mb-6">Full Stack Developer & AI Engineer</p>

                        <div className="prose prose-lg text-gray-700 mb-8 leading-relaxed">
                            <p>
                                I am passionate about building intelligent applications that bridge the gap between technology and users.
                                This Legal Advisory Platform is designed to democratize access to legal knowledge, making the Indian Constitution,
                                landmark cases, and legal procedures accessible to everyone through the power of AI.
                            </p>
                            <p>
                                With expertise in Full Stack Development and Artificial Intelligence, I aim to create solutions
                                that are not only functional but also intuitive and impactful.
                            </p>
                        </div>

                        {/* Portfolio Button */}
                        <a
                            href="https://meet-abhay.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
                        >
                            Visit Portfolio
                            <ExternalLink className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
