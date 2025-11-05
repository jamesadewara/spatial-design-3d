import React, { useEffect, useRef, useState } from "react";

interface GradientFluidTextProps {
  text: string;
  fromColor?: string; // e.g. "from-primary"
  toColor?: string;   // e.g. "to-accent"
  viaColor?: string;  // optional middle color e.g. "via-secondary"
  shimmer?: boolean;
  className?: string;
}

const GradientFluidText: React.FC<GradientFluidTextProps> = ({
  text,
  fromColor = "from-primary",
  viaColor,
  toColor = "to-accent",
  shimmer = true,
  className = "",
}) => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // scroll animation (like SectionHeader)
  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const startPoint = windowHeight * 0.8;
      const endPoint = windowHeight * 0.3;
      const elementTop = rect.top;

      let progress = 0;
      if (elementTop < startPoint) {
        progress = Math.min(1, (startPoint - elementTop) / (startPoint - endPoint));
      }
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // mouse parallax / tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLHeadingElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // tilt range
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // dynamic styles
  const skewX = -20 * (1 - scrollProgress);
  const blur = 8 * (1 - scrollProgress);
  const opacity = 0.3 + 0.7 * scrollProgress;

  const gradientClasses = viaColor
    ? `bg-gradient-to-r ${fromColor} ${viaColor} ${toColor}`
    : `bg-gradient-to-r ${fromColor} ${toColor}`;

  return (
    <h1
      ref={textRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
        font-bold leading-tight tracking-tight text-center w-full 
        animate-blur-in opacity-0 blur-md [animation-delay:150ms] 
        [animation-fill-mode:forwards] ${gradientClasses} bg-clip-text 
        text-transparent uppercase select-none transition-transform 
        duration-300 ease-out ${className}`}
      style={{
        transform: `skewX(${skewX}deg) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        filter: `blur(${blur}px) drop-shadow(0 0 ${scrollProgress * 20}px rgba(0,0,0,0.3))`,
        opacity,
      }}
    >
      <span
        className={`inline-block ${shimmer ? "animate-[shimmer_3s_ease-in-out_infinite]" : ""} bg-[length:200%_100%]`}
      >
        {text}
      </span>
    </h1>
  );
};

export default GradientFluidText;
