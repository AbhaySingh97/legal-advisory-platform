import React from 'react'
import { Scale, BookOpen, Gavel, Shield } from 'lucide-react'

export default function FloatingIcons() {
    const icons = [
        { Icon: Scale, delay: '0s', duration: '3s', top: '10%', left: '10%' },
        { Icon: BookOpen, delay: '0.5s', duration: '3.5s', top: '20%', right: '15%' },
        { Icon: Gavel, delay: '1s', duration: '4s', bottom: '15%', left: '20%' },
        { Icon: Shield, delay: '1.5s', duration: '3.2s', bottom: '25%', right: '10%' },
    ]

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
            {icons.map(({ Icon, delay, duration, ...position }, index) => (
                <div
                    key={index}
                    className="absolute text-white"
                    style={{
                        ...position,
                        animation: `float ${duration} ease-in-out infinite`,
                        animationDelay: delay,
                    }}
                >
                    <Icon className="w-16 h-16 md:w-24 md:h-24" />
                </div>
            ))}
        </div>
    )
}
