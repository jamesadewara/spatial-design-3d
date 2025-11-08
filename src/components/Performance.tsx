import { useEffect, useRef, useState } from "react";
import { CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";
import SectionHeader from "./SectionHeader";
import AnimatedServicesList from "./AnimatedServicesList";
import PixelCard from "./PixelCard";
import Section from "./Section";
import { ScrollPinContainer } from "./ScrollPinContainer";
import ModelViewer from "./ModelViewer";

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
    <Section showDotGrid={true} ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader align="left" title="Built for Performance" subtitle="Every detail engineered for excellence. Here's what sets our work apart." />
        <ScrollPinContainer
          className="grid lg:grid-cols-2 gap-12 lg:gap-16"
          start="top-=2% top"
          end="bottom top"
          pinSpacing={true}
          pinChildren={
            /* Sticky Image - Left */
            <div className="order-1 lg:order-2 cursor-target lg:sticky lg:top-24 lg:h-[600px] flex items-center justify-center">
              <div className={`relative w-full max-w-md ${isVisible ? "animate-scale-in" : "opacity-0"}`}>
                {/* Main visual container */}
                <div className="relative aspect-square">
                  {/* Background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-3xl" />

                  {/* Glass card with 3D effect */}
                  <div className="relative glass rounded-3xl p-8 transform hover:scale-105 transition-transform duration-500">
                    <div className="aspect-square flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <img
                            src="assets/img/robot.webp"
                            className="user-select-none"       
                          />
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl animate-pulse" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: "1s" }} />
                </div>
              </div>
            </div>
          }>

          {/* Scrolling Content - Right  */}
          <div className="order-2 lg:order-1 space-y-8 lg:space-y-12">
            <AnimatedServicesList
              services={features}
              showGradients={true}
              enableArrowNavigation={true}
              className="w-full"
              itemClassName="hover:scale-105 transition-transform"
            />
          </div>
        </ScrollPinContainer>
      </div>
    </Section>
  );
};
