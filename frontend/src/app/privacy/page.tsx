import React from 'react'

export default function PrivacyPolicyPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-gray-900 border-b pb-4">Privacy Policy</h1>

                <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
                    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
                        <p>
                            Welcome to the Legal Advisory Platform ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you access our website and use our AI-powered legal advisory services.
                            We comply with the Information Technology Act, 2000, and other applicable data protection laws in India.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
                        <ul className="list-disc pl-5 space-y-2">
                            <li><strong>Personal Information:</strong> We may collect personal details such as your name, email address, and contact information when you register or contact us.</li>
                            <li><strong>Chat Data:</strong> We utilize the queries and interactions you have with our AI Chatbot to improve the service. However, please avoid sharing sensitive personal confidential information (SPDI) like financial details or biometric data in the chat.</li>
                            <li><strong>Usage Data:</strong> We automatically collect information about your device, browser, and how you interact with our platform (e.g., pages visited, time spent).</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
                        <p>We use the collected information for the following purposes:</p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>To provide and maintain our AI Service.</li>
                            <li>To improve and personalize your experience.</li>
                            <li>To analyze usage patterns and optimize our algorithms.</li>
                            <li>To communicate with you regarding updates or support.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. data Sharing and Security</h2>
                        <p>
                            We do not sell your personal data. We implement reasonable security practices and procedures as required by the IT Act, 2000 to protect your data from unauthorized access.
                            However, no method of transmission over the Internet is 100% secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Rights</h2>
                        <p>
                            You have the right to access, review, and request correction or deletion of your personal data. Please contact us at support@legaladvisory.com for any such requests.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
