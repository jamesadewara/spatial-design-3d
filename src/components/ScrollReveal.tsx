import React, { useEffect, useRef, useMemo, ReactNode, RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  scrollContainerRef?: RefObject<HTMLElement>;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  rotationEnd?: string;
  wordAnimationEnd?: string;
  blurPerc?: number;
  rotatePerc?: number;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 4,
  containerClassName = '',
  blurPerc = 50,
  rotatePerc = 30,
  rotationEnd = 'bottom bottom',
  wordAnimationEnd = 'bottom bottom'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Process children to wrap text nodes and preserve HTML elements with their classes
  const processedChildren = useMemo(() => {
    const processNode = (node: ReactNode, key?: string | number): ReactNode => {
      if (typeof node === 'string') {
        // Split text into words
        return node.split(/(\s+)/).map((word, index) => {
          if (word.match(/^\s+$/)) {
            // Preserve whitespace
            return word;
          }
          return (
            <span className="inline-block word" key={`${key}-${index}`}>
              {word}
            </span>
          );
        });
      }
      
      if (React.isValidElement(node)) {
        // If it's a React element, recursively process its children
        const children = React.Children.map(node.props.children, (child, index) => 
          processNode(child, `${key}-${index}`)
        );
        
        // Clone the element with all original props including className
        return React.cloneElement(
          node, 
          { 
            ...node.props,
            key: key || node.key
          }, 
          children
        );
      }
      
      return node;
    };

    return React.Children.map(children, (child, index) => processNode(child, index));
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scroller = scrollContainerRef && scrollContainerRef.current ? scrollContainerRef.current : window;

    // Apply rotation animation to container
    gsap.fromTo(
      el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      {
        ease: 'none',
        rotate: 0,
        scrollTrigger: {
          trigger: el,
          scroller,
          start: 'top bottom',
          end: rotationEnd,
          scrub: true
        }
      }
    );

    // Find all word elements within the container
    const wordElements = el.querySelectorAll<HTMLElement>('.word');

    if (wordElements.length > 0) {
      // Apply opacity animation to words
      gsap.fromTo(
        wordElements,
        { opacity: baseOpacity, willChange: 'opacity' },
        {
          ease: 'none',
          opacity: 1,
          stagger: 0.05,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: `top bottom-=${rotatePerc}%`,
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );

      // Apply blur animation if enabled
      if (enableBlur) {
        gsap.fromTo(
          wordElements,
          { filter: `blur(${blurStrength}px)` },
          {
            ease: 'none',
            filter: 'blur(0px)',
            stagger: 0.05,
            scrollTrigger: {
              trigger: el,
              scroller,
              start: `top bottom-=${blurPerc}%`,
              end: wordAnimationEnd,
              scrub: true
            }
          }
        );
      }
    } else {
      // If no word elements found (only HTML elements), apply animations to the container directly
      gsap.fromTo(
        el,
        { 
          opacity: baseOpacity, 
          willChange: 'opacity',
          ...(enableBlur && { filter: `blur(${blurStrength}px)` })
        },
        {
          ease: 'none',
          opacity: 1,
          ...(enableBlur && { filter: 'blur(0px)' }),
          scrollTrigger: {
            trigger: el,
            scroller,
            start: 'top bottom-=20%',
            end: wordAnimationEnd,
            scrub: true
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [scrollContainerRef, enableBlur, baseRotation, baseOpacity, rotationEnd, wordAnimationEnd, blurStrength]);

  return (
    <div ref={containerRef} className={`${containerClassName}`}>
      {processedChildren}
    </div>
  );
};

export default ScrollReveal;