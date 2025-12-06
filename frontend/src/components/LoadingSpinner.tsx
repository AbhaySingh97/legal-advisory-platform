import React from 'react'

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>

                {/* Spinning Ring */}
                <div className="absolute inset-0 border-4 border-transparent border-t-primary-600 rounded-full spin"></div>

                {/* Inner Pulse */}
                <div className="absolute inset-2 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full pulse-glow opacity-30"></div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    )
}
