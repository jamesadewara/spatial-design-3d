import { useEffect, useRef, useState } from "react";
import { Globe, Database, Server, Shield, Wrench } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Website Creation",
    description: "Bespoke designs tailored to your brand identity and business goals"
  },
  {
    icon: Database,
    title: "Management Systems",
    description: "CMS and CRM setup for seamless content and customer management"
  },
  {
    icon: Server,
    title: "Domain & Configuration",
    description: "Complete domain purchase and technical configuration services"
  },
  {
    icon: Shield,
    title: "Production Deployment",
    description: "Secure hosting and deployment to ensure peak performance"
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Ongoing updates and technical support to keep you running smoothly"
  },
];

export const Services = () => {
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
    <section id="services" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* 3D Visual - Left (Sticky) */}
          <div className="order-2 md:order-1 lg:sticky lg:top-24 lg:h-[700px] flex items-center">
            <div className={`flex justify-center w-full ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
              <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Rotating cube layers */}
                  <div className="absolute inset-0 flex items-center justify-center animate-rotate" style={{ animationDuration: "15s" }}>
                    <div className="w-48 h-48 border-2 border-primary/30 rounded-lg transform rotate-45" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center animate-rotate" style={{ animationDuration: "20s", animationDirection: "reverse" }}>
                    <div className="w-40 h-40 border-2 border-secondary/30 rounded-lg transform rotate-45" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="glass rounded-2xl p-8">
                      <Globe className="w-20 h-20 text-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Services List - Right */}
          <div className={`order-1 md:order-2 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text text-right">
              What We Deliver
            </h2>
            <p className="text-lg text-muted-foreground mb-8 text-right">
              End-to-end solutions for your digital presence
            </p>
            
            <div className="space-y-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`glass rounded-xl p-6 hover:border-primary/50 transition-all duration-300 group ${isVisible ? "animate-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
