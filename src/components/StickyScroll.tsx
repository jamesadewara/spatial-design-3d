import { useEffect, useRef, useState } from "react";
import { CheckCircle, Zap, Shield, TrendingUp } from "lucide-react";

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

export const StickyScroll = () => {
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Sticky Image - Left */}
          <div className="lg:sticky lg:top-24 lg:h-[600px] flex items-center justify-center">
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

          {/* Scrolling Content - Right */}
          <div className="space-y-8 lg:space-y-12">
            <div className={`${isVisible ? "animate-fade-up" : "opacity-0"}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Built for <span className="gradient-text">Performance</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Every detail engineered for excellence. Here's what sets our work apart.
              </p>
            </div>

            {features.map((feature, index) => (
              <div
                key={index}
                className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="glass rounded-2xl p-8 hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon className="w-7 h-7 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div className={`glass rounded-2xl p-8 text-center ${isVisible ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
              <h3 className="text-2xl font-bold mb-4">Ready to Experience the Difference?</h3>
              <p className="text-muted-foreground mb-6">
                Let's build something extraordinary together.
              </p>
              <button
                onClick={() => {
                  const element = document.getElementById("contact");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-medium hover:opacity-90 transition-opacity"
              >
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
