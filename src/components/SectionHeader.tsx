import React, { useEffect, useRef, useState } from "react";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
    align?: 'left' | 'center' | 'right';
    className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
    title,
    subtitle,
    align = 'left',
    className = ""
}) => {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!titleRef.current) return;

            const rect = titleRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate progress as element enters viewport from bottom
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // Start animation when element is 80% down the viewport
            const startPoint = windowHeight * 0.8;
            const endPoint = windowHeight * 0.3;

            let progress = 0;
            if (elementTop < startPoint) {
                progress = Math.min(1, (startPoint - elementTop) / (startPoint - endPoint));
            }

            setScrollProgress(progress);
        };

        handleScroll(); // Initial check
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto'
    }[align];

    // Interpolate skew and blur based on scroll progress
    const skewX = -20 * (1 - scrollProgress); // From 20deg to 0deg
    const blur = 8 * (1 - scrollProgress); // From 8px to 0px
    const opacity = 0.3 + (0.7 * scrollProgress); // From 0.3 to 1

    return (
        <div className={`max-w-4xl ${alignmentClasses} mb-12 ${className}`}>
            <h2
                ref={titleRef}
                className="shimmer text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 relative overflow-hidden"
                style={{
                    transform: `skewX(${skewX}deg)`,
                    filter: `blur(${blur}px)`,
                    opacity: opacity,
                    transition: 'transform 0.3s ease-out, filter 0.3s ease-out, opacity 0.3s ease-out'
                }}
            >
                <span className="bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite]">
                    {title}
                </span>
            </h2>
            {subtitle && (
                <p
                    className="text-lg sm:text-xl text-muted-foreground"
                    style={{
                        opacity: scrollProgress,
                        transform: `translateY(${20 * (1 - scrollProgress)}px)`,
                        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
                    }}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;