import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote: "The landing page SD3 created for us increased our conversion rate by 300%. Simply outstanding work!"
  },
  {
    name: "Michael Chen",
    company: "DesignHub",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote: "Professional, creative, and results-driven. Our new website perfectly captures our brand essence."
  },
  {
    name: "Emily Rodriguez",
    company: "StartupXYZ",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote: "From concept to launch, the process was seamless. The attention to detail is unmatched."
  },
  {
    name: "David Kim",
    company: "InnovateCo",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&h=200&q=80",
    rating: 5,
    quote: "Best investment we made for our online presence. The ROI speaks for itself."
  },
];

export const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if section is in view
      const inView = rect.top < windowHeight && rect.bottom > 0;
      setIsInView(inView);

      if (inView) {
        // Calculate scroll progress (0 to 1) based on section position
        const sectionHeight = rect.height;
        const scrolled = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, scrolled / (sectionHeight + windowHeight)));
        setScrollProgress(progress);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Section showDotGrid={true} id="testimonials" ref={sectionRef} className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          align="center"
          title="What Clients Say"
          subtitle="Real results from real partnerships"
        />

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12">
          {testimonials.map((testimonial, index) => {
            // Calculate individual card animation based on scroll and position
            const delay = index * 0.1;
            const cardProgress = Math.max(0, Math.min(1, (scrollProgress - delay) * 2));

            return (
              <div className="cursor-target glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300">

                {/* Animated Background Gradient */}
                <div
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: 0.6 + (scrollProgress * 0.2)
                  }}
                />

                {/* Quote Icon with Parallax */}
                <Quote
                  className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 text-primary/30 transition-all duration-500 group-hover:text-primary/50 group-hover:scale-110"
                  style={{
                    transform: `translateY(${scrollProgress * -10}px) rotate(${scrollProgress * 5}deg)`
                  }}
                />

                {/* Rating with Stagger Animation */}
                <div className="flex gap-1 mb-4 md:mb-6 relative z-10">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary transition-all duration-300 group-hover:scale-110"
                      style={{
                        opacity: cardProgress,
                        transform: `translateY(${(1 - cardProgress) * 20}px)`,
                        transitionDelay: `${delay + (i * 0.05)}s`
                      }}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 mb-4 md:mb-6 flex-1 font-light leading-relaxed relative z-10 transition-all duration-300 group-hover:text-foreground/90">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 md:gap-4 mt-auto relative z-10">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full p-0.5 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm md:text-base text-foreground truncate transition-all duration-300 group-hover:text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground truncate">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>

            );
          })}
        </div>
      </div>
    </Section>
  );
};