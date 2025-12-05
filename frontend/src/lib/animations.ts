// Animation variants for Framer Motion
// Inspired by Bluxstudio.com premium animations

export const fadeInUp = {
    hidden: {
        opacity: 0,
        y: 60
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99] // Custom easing for smooth motion
        }
    }
}

export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut"
        }
    }
}

export const scaleIn = {
    hidden: {
        opacity: 0,
        scale: 0.8
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.5,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const slideInLeft = {
    hidden: {
        opacity: 0,
        x: -60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

export const slideInRight = {
    hidden: {
        opacity: 0,
        x: 60
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.6, -0.05, 0.01, 0.99]
        }
    }
}

// Container for staggered children animations
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

// Fast stagger for grids
export const fastStaggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0
        }
    }
}

// Hover animations for cards
export const cardHover = {
    rest: {
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    hover: {
        scale: 1.02,
        y: -8,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
}

// Button hover with scale
export const buttonHover = {
    rest: {
        scale: 1,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: "easeOut"
        }
    },
    tap: {
        scale: 0.95,
        transition: {
            duration: 0.1,
            ease: "easeOut"
        }
    }
}

// Parallax effect for backgrounds
export const parallaxVariant = {
    initial: { y: 0 },
    animate: (custom: number) => ({
        y: custom,
        transition: {
            duration: 0,
            ease: "linear"
        }
    })
}

// Number counter animation
export const counterVariant = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5
        }
    }
}

// Page transition
export const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: {
            duration: 0.3,
            ease: "easeIn"
        }
    }
}
