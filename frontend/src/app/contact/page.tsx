import React from 'react'
import { Mail, Phone, MapPin, ExternalLink, Github, Linkedin } from 'lucide-react'

export default function ContactPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">Get In Touch</h1>
                    <p className="text-gray-600 text-lg">Have questions about the platform? Feel free to reach out!</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Contact Information Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6">Contact Information</h2>

                        {/* Developer Profile */}
                        <div className="flex flex-col items-center text-center mb-8 pb-8 border-b border-gray-200">
                            <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                                <span className="text-3xl font-bold text-white">AS</span>
                            </div>
                            <h3 className="text-xl font-bold mb-1">Abhay Singh Chauhan</h3>
                            <p className="text-gray-600 text-sm uppercase tracking-wider">Full Stack Developer & AI Engineer</p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="bg-primary-100 p-3 rounded-lg">
                                    <Phone className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Phone</h4>
                                    <a href="tel:+916399219273" className="text-gray-600 hover:text-primary-600 transition-colors">
                                        +91 6399219273
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-primary-100 p-3 rounded-lg">
                                    <Mail className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Email</h4>
                                    <a href="mailto:contact@legaladvisory.com" className="text-gray-600 hover:text-primary-600 transition-colors">
                                        contact@legaladvisory.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="bg-primary-100 p-3 rounded-lg">
                                    <MapPin className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">Location</h4>
                                    <p className="text-gray-600">India</p>
                                </div>
                            </div>
                        </div>

                        {/* Portfolio Link */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <a
                                href="https://meet-abhay.vercel.app/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Visit Portfolio
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
                        <h2 className="text-2xl font-bold mb-6">Send a Message</h2>

                        <form className="space-y-5">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    placeholder="How can we help?"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                    placeholder="Your message here..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Send Message
                            </button>
                        </form>

                        <p className="text-sm text-gray-500 text-center mt-6">
                            We'll get back to you as soon as possible!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
