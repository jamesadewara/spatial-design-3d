import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollPinContainerProps {
  className?: string;
  start?: string;
  end?: string;
  pinSpacing?: boolean;
  pinChildren: React.ReactNode;
  children: React.ReactNode;
  reverseOrder?: boolean;
}

export const ScrollPinContainer: React.FC<ScrollPinContainerProps> = ({
  className = "",
  start = "top+=10% top",
  end = "bottom top",
  pinSpacing = true,
  pinChildren,
  children,
  reverseOrder = false, // default false
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!triggerRef.current || !pinRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: triggerRef.current,
          start,
          end,
          pin: pinRef.current,
          pinSpacing,
          // markers: true,
        });
      }, triggerRef);

      return () => {
        ctx.revert();
        ScrollTrigger.refresh();
      };
    });

    // Mobile fallback (optional)
    mm.add("(max-width: 1023px)", () => {});

    return () => mm.revert();
  }, [start, end, pinSpacing]);

  return (
    <div ref={triggerRef} className={className}>
      {reverseOrder ? (
        <>
          <div>{children}</div>
          <div ref={pinRef}>{pinChildren}</div>
        </>
      ) : (
        <>
          <div ref={pinRef}>{pinChildren}</div>
          <div>{children}</div>
        </>
      )}
    </div>
  );
};