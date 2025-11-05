import { useEffect, useRef, useState } from "react";
import { Box } from "lucide-react";

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Content - Left */}
          <div className={`${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Crafting Digital Experiences That Convert
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                <strong className="text-foreground">What I Do:</strong> I create stunning, 
                high-performance landing pages that don't just look beautiful—they drive results.
              </p>
              <p>
                <strong className="text-foreground">How I Do It:</strong> By combining cutting-edge 
                design principles with conversion-focused strategies, every element is engineered 
                to engage your audience and guide them toward action.
              </p>
              <p>
                <strong className="text-foreground">Why I Do It:</strong> Because your business 
                deserves more than a website. You deserve a powerful digital presence that works 
                as hard as you do, turning visitors into customers and clicks into conversions.
              </p>
            </div>
          </div>

          {/* 3D Visual - Right (Sticky) */}
          <div className="lg:sticky lg:top-24 lg:h-[600px] flex items-center">
            <div className={`flex justify-center w-full ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Animated 3D Cube Representation */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full animate-float">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 blur-2xl" />
                  <div className="relative glass rounded-3xl p-12 flex items-center justify-center">
                    <Box className="w-32 h-32 text-primary animate-rotate" style={{ animationDuration: "10s" }} />
                  </div>
                </div>
              </div>
              
              {/* Orbiting Elements */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
