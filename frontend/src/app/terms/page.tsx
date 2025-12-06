import React from 'react'

export default function TermsPage() {
    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-8 text-gray-900 border-b pb-4">Terms of Service</h1>

                <div className="prose prose-amber max-w-none text-gray-700 space-y-6">
                    <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using the Legal Advisory Platform, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">2. Disclaimer: Not Legal Advice</h2>
                        <p className="bg-yellow-50 p-4 border-l-4 border-yellow-500 text-yellow-800">
                            <strong>IMPORTANT:</strong> The information provided by our AI Chatbot and on this platform is for educational and informational purposes only.
                            It does <strong>not</strong> constitute professional legal advice. You should not act or refrain from acting on the basis of any content included in this site without seeking
                            legal or other professional advice on the particular facts and circumstances at issue from an attorney licensed in your state or country.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">3. Use of Service</h2>
                        <p>
                            You agree to use our platform only for lawful purposes. You must not use the site to transmit any malicious code, harass others, or violate any applicable laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
                        <p>
                            We shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our service,
                            including reliance on the AI-generated information.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    )
}
