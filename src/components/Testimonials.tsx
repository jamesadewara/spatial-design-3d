import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "TechCorp Inc.",
    image: "SJ",
    rating: 5,
    quote: "The landing page SD3 created for us increased our conversion rate by 300%. Simply outstanding work!"
  },
  {
    name: "Michael Chen",
    company: "DesignHub",
    image: "MC",
    rating: 5,
    quote: "Professional, creative, and results-driven. Our new website perfectly captures our brand essence."
  },
  {
    name: "Emily Rodriguez",
    company: "StartupXYZ",
    image: "ER",
    rating: 5,
    quote: "From concept to launch, the process was seamless. The attention to detail is unmatched."
  },
  {
    name: "David Kim",
    company: "InnovateCo",
    image: "DK",
    rating: 5,
    quote: "Best investment we made for our online presence. The ROI speaks for itself."
  },
];

export const Testimonials = () => {
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
    <section id="testimonials" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Grid background effect */}
      <div className="absolute inset-0 dot-grid opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Clients Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from real partnerships
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="glass rounded-2xl p-6 h-full flex flex-col hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-muted-foreground mb-6 flex-1 italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
