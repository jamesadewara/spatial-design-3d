import { useEffect, useRef, useState } from "react";
import { Globe, Database, Server, Shield, Wrench } from "lucide-react";
import SectionHeader from "./SectionHeader";
import AnimatedServicesList, { Service } from "./AnimatedServicesList";

const services: Service[] = [
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
        <SectionHeader align="right" title="What We Deliver" subtitle="End-to-end solutions for your digital presence" />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* 3D Visual - Left (Sticky) */}
          <div className="cursor-target order-2 lg:order-1 lg:sticky lg:top-24 self-start">
            <div className={`flex justify-center w-full ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem]">
                  {/* Animated 3D Cube Representation */}
                  <div className="cursor-target absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full animate-float">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 blur-2xl" />
                      <div className="relative rounded-3xl p-12 flex items-center justify-center">
                        <img
                          src="assets/img/cube.png"
                          alt="3D Cube"
                          className="w-32 h-32 sm:w-48 sm:h-48 lg:w-full lg:h-full object-contain animate-pulse"
                          style={{ animationDuration: "3s" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>

          {/* Services List - Right */}
          <div className={`order-1 lg:order-2 ${isVisible ? "animate-slide-left" : "opacity-0"}`}>
            <div className="space-y-6">
              <AnimatedServicesList
                services={services}
                showGradients={true}
                enableArrowNavigation={true}
                className="w-full"
                itemClassName="hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
