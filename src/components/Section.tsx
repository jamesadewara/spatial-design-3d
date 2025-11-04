import React from "react";
import DotGrid from "./DotGrid";

interface SectionProps {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    /** Enable/disable the dot grid background */
    showDotGrid?: boolean;
    /** Section title (optional) */
    title?: string;
    /** Section description (optional) */
    description?: string;
    /** Alignment for title and description */
    align?: 'left' | 'center' | 'right';
}

const Section: React.FC<SectionProps> = ({
    children,
    id,
    className = "",
    showDotGrid = false,
    title,
    description,
    align = 'left',
}) => {
    const alignmentClasses = {
        left: 'text-left',
        center: 'text-center mx-auto',
        right: 'text-right ml-auto'
    }[align];

    return (
        <section 
            id={id}  
            className={className}
        >
            {/* Optional dot grid background */}
            {showDotGrid && (
                <DotGrid 
                    dotSize={6}
                    gap={24}
                    baseColor="#2e66f1"
                    activeColor="#e33af5"
                    proximity={100}
                    shockRadius={200}
                    shockStrength={3}
                    resistance={500}
                    returnDuration={1.5}
                    className="absolute inset-0"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        opacity: 0.15
                    }}
                />
            )}

            {/* Section header with optional title and description */}
            {(title || description) && (
                <div className={`relative z-10 max-w-4xl ${alignmentClasses} mb-12`}>
                    {title && (
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-lg text-muted-foreground">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    )
}

export default Section;