import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";
import Section from "./Section";
import BlurText from "./BlurText";
import TextPressure from "./TextPressure";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Section
      showDotGrid={true}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Background Image with Parallax */}
      <div
        className="w-screen h-screen absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out"
        style={{ 
          backgroundImage: `url(assets/img/hero-3d.png)`,
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) scale(1.1)`,
          opacity: 0.25
        }}
      />

      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sparkle 1 - Top Left */}
        <div 
          className="absolute top-[20%] left-[10%] animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full w-24 h-24 animate-pulse" />
            <Sparkles className="w-12 h-12 text-primary relative z-10" />
          </div>
        </div>

        {/* Zap - Top Right */}
        <div 
          className="absolute top-[30%] right-[15%] animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * -50}px, ${mousePosition.y * 50}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '0.5s'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-secondary/30 blur-xl rounded-full w-20 h-20 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <Zap className="w-10 h-10 text-secondary relative z-10" />
          </div>
        </div>

        {/* Star - Bottom Left */}
        <div 
          className="absolute bottom-[25%] left-[15%] animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * -30}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-accent/30 blur-xl rounded-full w-16 h-16 animate-pulse" style={{ animationDelay: '1s' }} />
            <Star className="w-8 h-8 text-accent relative z-10" />
          </div>
        </div>

        {/* Sparkle 2 - Bottom Right */}
        <div 
          className="absolute bottom-[20%] right-[20%] animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * -35}px, ${mousePosition.y * -45}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1.5s'
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full w-28 h-28 animate-pulse" style={{ animationDelay: '1.5s' }} />
            <Sparkles className="w-14 h-14 text-primary relative z-10" />
          </div>
        </div>

        {/* Floating Orbs */}
        <div 
          className="absolute top-[50%] left-[5%] w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * 60}px, ${mousePosition.y * 60}px)`,
            transition: 'transform 0.4s ease-out',
            animationDelay: '2s'
          }}
        />
        <div 
          className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-2xl animate-float"
          style={{ 
            transform: `translate(${mousePosition.x * -70}px, ${mousePosition.y * -50}px)`,
            transition: 'transform 0.4s ease-out',
            animationDelay: '2.5s'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
          <div className="w-full flex flex-col justify-center items-center">
            {/* Main Headline */}

            <TextPressure
              text="Create Highly Converting Landing Pages That Convert"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-center w-full animate-blur-in opacity-0 blur-md [animation-delay:150ms] [animation-fill-mode:forwards] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase"
              textColor="hsl(var(--foreground))"
              hoverColor="hsl(var(--primary))"
            />

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl text-center leading-relaxed px-4 sm:px-0 animate-fade-up mt-6 opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
              Transform your online presence with landing pages engineered to convert.
              From concept to conversion, we make your vision perform.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-up pt-4 opacity-0 [animation-delay:850ms] [animation-fill-mode:forwards]">
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("contact")}
              className="cursor-target w-full sm:w-auto min-w-[200px]"
              shimmer={true}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="xl"
              onClick={() => scrollToSection("about")}
              className="cursor-target hover:bg-transparent w-full sm:w-auto min-w-[200px]"
              shimmer={true}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
};