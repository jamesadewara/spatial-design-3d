import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseScrollPinOptions {
  triggerRef: React.RefObject<HTMLElement>;
  pinRef: React.RefObject<HTMLElement>;
  start?: string;      // e.g. "top top"
  end?: string;        // e.g. "bottom top"
  pinSpacing?: boolean; // default true
  // you can add more options (markers, scrub, etc) if needed
}

export function useScrollPin({
  triggerRef,
  pinRef,
  start = "top top",
  end = "bottom top",
  pinSpacing = true,
}: UseScrollPinOptions) {
  useLayoutEffect(() => {
    if (!triggerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerRef.current,
        start,
        end,
        pin: pinRef.current,
        pinSpacing,
        // markers: true, // for debugging
      });
    }, triggerRef);

    return () => {
      ctx.revert();     // cleanup everything inside the context
      ScrollTrigger.refresh();
    };
  }, [triggerRef, pinRef, start, end, pinSpacing]);
}
