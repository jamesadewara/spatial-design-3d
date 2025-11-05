import { useEffect, useRef, useState } from "react";
import { CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";
import SectionHeader from "./SectionHeader";
import AnimatedServicesList from "./AnimatedServicesList";
import PixelCard from "./PixelCard";
import Section from "./Section";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast Performance",
    description: "Optimized for speed with sub-second load times. Every millisecond counts when converting visitors into customers."
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description: "Built with security best practices from day one. Your data and your customers' trust are protected at every level."
  },
  {
    icon: TrendingUp,
    title: "Conversion Optimized",
    description: "Every element is strategically placed to guide visitors toward action. Psychology meets design for maximum impact."
  },
  {
    icon: CheckCircle,
    title: "Fully Responsive",
    description: "Flawless experience across all devices. From smartphones to 4K displays, your site looks pixel-perfect everywhere."
  },
];

export const Performance = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Section showDotGrid={true}  ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader align="left" title="Built for Performance" subtitle="Every detail engineered for excellence. Here's what sets our work apart." />
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Scrolling Content - Right */}
          <div className="space-y-8 lg:space-y-12">
            <AnimatedServicesList
                services={features}
                showGradients={true}
                enableArrowNavigation={true}
                className="w-full"
                itemClassName="hover:scale-105 transition-transform"
              />
          </div>
          {/* Sticky Image - Left */}
          <div className="cursor-target lg:sticky lg:top-24 lg:h-[600px] flex items-center justify-center">
            <div className={`relative w-full max-w-md ${isVisible ? "animate-scale-in" : "opacity-0"}`}>
              {/* Main visual container */}
              <div className="relative aspect-square">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-3xl" />
                
                {/* Glass card with 3D effect */}
                <div className="relative glass rounded-3xl p-8 transform hover:scale-105 transition-transform duration-500">
                  <div className="aspect-square flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Orbiting elements */}
                      <div className="absolute inset-0 animate-rotate" style={{ animationDuration: "20s" }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                          <Zap className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                      <div className="absolute inset-0 animate-rotate" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-secondary/20 backdrop-blur-sm flex items-center justify-center">
                          <Shield className="w-8 h-8 text-secondary" />
                        </div>
                      </div>
                      
                      {/* Center element */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-secondary p-8 animate-float">
                          <TrendingUp className="w-full h-full text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};
