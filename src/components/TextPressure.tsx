import { useRef, useState } from 'react';

interface TextPressureProps {
  text?: string;
  className?: string;
  textColor?: string;
  hoverColor?: string;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Hover Text',
  className = '',
  textColor = '#FFFFFF',
  hoverColor = '#FF6B6B'
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chars = text.split('');

  return (
    <div className={`flex justify-center items-center h-full ${className}`}>
      <div className="text-center">
        {chars.map((char, index) => (
          <span
            key={index}
            className="inline-block transition-all duration-300 ease-out cursor-pointer mx-0"
            style={{
              color: hoveredIndex === index ? hoverColor : textColor,
              transform: hoveredIndex === index 
                ? 'scale(1.5) translateY(-10px)' 
                : 'scale(1)',
              textShadow: hoveredIndex === index 
                ? `0 0 20px ${hoverColor}` 
                : 'none',
              fontWeight: hoveredIndex === index ? '900' : '400',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextPressure;