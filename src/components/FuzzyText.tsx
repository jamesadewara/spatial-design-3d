import React, { useEffect, useRef } from 'react';

interface FuzzyTextProps {
  children: React.ReactNode;
  // Use className to pass all Tailwind styles
  className?: string; 
  fontFamily?: string;
  enableHover?: boolean;
  baseIntensity?: number;
  hoverIntensity?: number;
}

const FuzzyText: React.FC<FuzzyTextProps> = ({
  children,
  className = '', // Default to an empty string if no classes are provided
  fontFamily = 'inherit',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement & { cleanupFuzzyText?: () => void }>(null);
  const wrapperRef = useRef<HTMLDivElement>(null); // New ref for the wrapper

  // Extract Tailwind font-size, font-weight, and color from the className
  useEffect(() => {
    let animationFrameId: number;
    let isCancelled = false;
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    
    if (!canvas || !wrapper) return;

    // --- Start: Dynamic Style Extraction ---
    // Create a temporary element to compute styles from Tailwind classes
    const tempElement = document.createElement('span');
    tempElement.className = className;
    tempElement.innerText = 'M'; // Need some text to measure font
    // Append to the wrapper (which is already in the DOM) instead of body
    wrapper.appendChild(tempElement); 

    const computedStyle = window.getComputedStyle(tempElement);
    const fontSizeStr = computedStyle.fontSize || '6rem'; // Default large size if computation fails
    const fontWeight = computedStyle.fontWeight || '900'; // Default bold
    const color = computedStyle.color || '#fff'; // Default white

    const numericFontSize = parseFloat(fontSizeStr);
    const computedFontFamily = computedStyle.fontFamily || 'sans-serif';

    // Remove the temporary element
    wrapper.removeChild(tempElement);
    // --- End: Dynamic Style Extraction ---

    const init = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (isCancelled) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const text = React.Children.toArray(children).join('');

      // --- Offscreen Canvas Setup ---
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      // Use extracted styles
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      const metrics = offCtx.measureText(text);

      // (Original logic from here remains mostly the same, now using extracted variables)
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = metrics.actualBoundingBoxRight ?? metrics.width;
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;

      const textBoundingWidth = Math.ceil(actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);

      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;

      const xOffset = extraWidthBuffer / 2;
      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      offCtx.fillText(text, xOffset - actualLeft, actualAscent);

      const horizontalMargin = 50;
      const verticalMargin = 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false;
      const fuzzRange = 30;

      const run = () => {
        if (isCancelled) return;
        ctx.clearRect(-fuzzRange, -fuzzRange, offscreenWidth + 2 * fuzzRange, tightHeight + 2 * fuzzRange);
        const intensity = isHovering ? hoverIntensity : baseIntensity;
        for (let j = 0; j < tightHeight; j++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j, offscreenWidth, 1);
        }
        animationFrameId = window.requestAnimationFrame(run);
      };

      run();

      const isInsideTextArea = (x: number, y: number) =>
        x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;

      const handleMouseMove = (e: MouseEvent) => {
        if (!enableHover) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleMouseLeave = () => {
        isHovering = false;
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (!enableHover) return;
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        isHovering = isInsideTextArea(x, y);
      };

      const handleTouchEnd = () => {
        isHovering = false;
      };

      if (enableHover) {
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);
        canvas.addEventListener('touchmove', handleTouchMove, {
          passive: false
        });
        canvas.addEventListener('touchend', handleTouchEnd);
      }

      const cleanup = () => {
        window.cancelAnimationFrame(animationFrameId);
        if (enableHover) {
          canvas.removeEventListener('mousemove', handleMouseMove);
          canvas.removeEventListener('mouseleave', handleMouseLeave);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        }
      };

      canvas.cleanupFuzzyText = cleanup;
    };

    init();

    return () => {
      isCancelled = true;
      window.cancelAnimationFrame(animationFrameId);
      if (canvas && canvas.cleanupFuzzyText) {
        canvas.cleanupFuzzyText();
      }
    };
  }, [children, className, fontFamily, enableHover, baseIntensity, hoverIntensity]);

  // Wrap the canvas in a div so we can reliably compute the Tailwind classes
  return (
    <div ref={wrapperRef} className={className} style={{ display: 'inline-block' }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FuzzyText;