import React from "react";
import DotGrid from "./DotGrid";

interface SectionProps {
    children?: React.ReactNode;
    id?: string;
    className?: string;
    /** Enable/disable the dot grid background */
    showDotGrid?: boolean;
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(({
    children,
    id,
    className = "",
    showDotGrid = false,
}, ref) => {
    return (
        <section 
            id={id}  
            ref={ref}
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
            {/* Main content */}
            <div className="relative z-10">
                {children}
            </div>
        </section>
    )
});

export default Section;