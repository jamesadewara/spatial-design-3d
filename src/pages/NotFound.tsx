import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import FuzzyText from "@/components/FuzzyText";
import TargetCursor from "@/components/TargetCursor";

const NotFound = () => {
  const [glitchText, setGlitchText] = useState("404");

  useEffect(() => {
    const glitchChars = "!<>-_\\/[]{}—=+*^?#________";
    const originalText = "404";

    const interval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.7;

      if (shouldGlitch) {
        const glitched = originalText
          .split("")
          .map((char) =>
            Math.random() > 0.5
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("");
        setGlitchText(glitched);

        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      {/* Defer custom cursor load to prevent initial render issues */}
      {typeof window !== 'undefined' && (
        <TargetCursor 
          spinDuration={1}
          hideDefaultCursor={true}
        />
      )}
      {/* Background effects */}
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 bg-gradient-radial opacity-30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Glitch 404 */}
          <div className="mb-8 relative">
            <h1 className="text-9xl md:text-[12rem] font-bold gradient-text select-none">
              {glitchText}
            </h1>
            <div className="absolute inset-0 flex items-center justify-center opacity-20 blur-sm">
              <FuzzyText
                hoverIntensity={0.5}
                baseIntensity={0.2}
                enableHover={true}
              >
                404
              </FuzzyText>
            </div>
          </div>

          {/* Message */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-shadow-DEFAULT">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! Looks like this page got lost in the digital void.
            Let's get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" asChild className="cursor-target">
              <Link to="/" className="flex items-center gap-2">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>
            <Button className="cursor-target" variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
