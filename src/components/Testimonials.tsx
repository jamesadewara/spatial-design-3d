import { useEffect, useRef, useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Section showDotGrid={true} id="testimonials" ref={sectionRef} className="py-12 md:py-20 lg:py-28 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionHeader
          align="center"
          title="What Clients Say"
          subtitle="Real results from real partnerships"
        />

        {/* 3D Carousel */}
        <div className="mt-8 md:mt-12 relative" style={{ perspective: "1500px" }}>
          <Carousel
            setApi={setApi}
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => {
                const isActive = current - 1 === index;
                const distance = Math.abs(current - 1 - index);
                
                return (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <div 
                      className="p-1 h-full transition-all duration-500 ease-out"
                      style={{
                        transform: isActive 
                          ? 'scale(1.09) rotateY(0deg) translateZ(50px)' 
                          : `scale(${1 - distance * 0.1}) rotateY(${(current - 1 - index) * -5}deg) translateZ(-${distance * 5}px)`,
                        opacity: distance > 1 ? 0.4 : 1,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      <div className="cursor-target glass p-6 h-full flex flex-col relative group hover:border-primary/50 transition-all duration-300 hover:scale-105">
                        {/* Quote Icon with Parallax */}
                        <Quote className="absolute top-4 right-4 w-6 h-6 md:w-8 md:h-8 text-primary/30 transition-all duration-500 group-hover:text-primary/50 group-hover:scale-110 group-hover:rotate-12" />

                        {/* Rating with Animation */}
                        <div className="flex gap-1 mb-4 md:mb-6 relative z-10">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 md:w-5 md:h-5 fill-primary text-primary transition-all duration-300 group-hover:scale-110"
                              style={{
                                transitionDelay: `${i * 0.05}s`
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
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden ring-2 ring-primary/20 transition-all duration-300 group-hover:ring-primary/40 group-hover:scale-110">
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
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
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* Custom Navigation Buttons */}
            <div className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20">
              <CarouselPrevious className="cursor-target h-10 w-10 md:h-12 md:w-12 bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300">
                <ChevronLeft className="h-6 w-6 text-primary" />
              </CarouselPrevious>
            </div>
            
            <div className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20">
              <CarouselNext className="cursor-target h-10 w-10 md:h-12 md:w-12 bg-primary/10 backdrop-blur-sm border-primary/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300">
                <ChevronRight className="h-6 w-6 text-primary" />
              </CarouselNext>
            </div>
          </Carousel>

          {/* Carousel Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 cursor-target rounded-full transition-all duration-300 ${
                  current === index + 1 
                    ? 'w-8 bg-primary' 
                    : 'w-2 bg-primary/30 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};