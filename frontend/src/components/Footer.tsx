import Link from 'next/link'
import { Scale, Github, Twitter, Linkedin } from 'lucide-react'

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="relative z-10 bg-gray-900 text-white py-12">
            <div className="container-custom">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <Scale className="w-8 h-8" />
                            <span className="font-display font-bold text-xl">Legal Advisory</span>
                        </div>
                        <p className="text-gray-400 text-sm">
                            Your comprehensive platform for Indian constitutional law and legal guidance.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/chatbot" className="hover:text-white transition-colors">Chatbot</Link></li>
                            <li><Link href="/library" className="hover:text-white transition-colors">Library</Link></li>
                            <li><Link href="/cases" className="hover:text-white transition-colors">Cases</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-bold mb-4">Resources</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/procedures" className="hover:text-white transition-colors">Legal Procedures</Link></li>
                            <li><Link href="/library?category=Fundamental%20Rights" className="hover:text-white transition-colors">Fundamental Rights</Link></li>
                            <li><Link href="/library?category=Directive%20Principles" className="hover:text-white transition-colors">Directive Principles</Link></li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-bold mb-4">Legal</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {currentYear} Legal Advisory Platform. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
