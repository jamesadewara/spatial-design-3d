import { useEffect, useRef, useState } from "react";
import { Globe, Database, Server, Shield, Wrench } from "lucide-react";
import SectionHeader from "./SectionHeader";
import AnimatedServicesList, { Service } from "./AnimatedServicesList";
import ModelViewer from "./ModelViewer";
import { ScrollPinContainer } from "./ScrollPinContainer";

const services: Service[] = [
  {
    icon: Globe,
    title: "Custom Website Creation",
    description:
      "Bespoke designs tailored to your brand identity and business goals",
  },
  {
    icon: Database,
    title: "Management Systems",
    description: "CMS and CRM setup for seamless content and customer management",
  },
  {
    icon: Server,
    title: "Domain & Configuration",
    description: "Complete domain purchase and technical configuration services",
  },
  {
    icon: Shield,
    title: "Production Deployment",
    description: "Secure hosting and deployment to ensure peak performance",
  },
  {
    icon: Wrench,
    title: "Maintenance & Support",
    description: "Ongoing updates and technical support to keep you running smoothly",
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

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeader
          align="right"
          title="What We Deliver"
          subtitle="End‑to‑end solutions for your digital presence"
        />

        <ScrollPinContainer
          className="grid lg:grid-cols-2 gap-12 items-start"
          start="top-=10% top"
          end="bottom top"
          pinSpacing={true}
          pinChildren={<div className="order-2 lg:order-1 self-start">
            <div
              className={`flex justify-center w-full transition-all duration-700 ${isVisible ? "animate-slide-right opacity-100" : "opacity-0"
                }`}
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem]">
                {/* Background gradient glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 blur-2xl" />

                {/* Floating 3D container */}
                <div className="cursor-target relative w-full h-full rounded-3xl overflow-hidden flex items-center justify-center">
                  <ModelViewer
                    src="/assets/3d/rubic.glb"
                    placeholder="/assets/img/cube.png"
                    allowZoom={false}
                    allowPan={true}
                    allowRotate={true}
                    lockVerticalRotation={true}
                    playAnimation={true}
                    playOnScroll={true}
                    reverseOnScrollUp={true}
                  />
                </div>
              </div>
            </div>
          </div>}
        >
          {/* pinChildren: The 3D viewer on left */}
          <>

          </>
          {/* children: The scrolling content on right */}
          <>
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
          </>
        </ScrollPinContainer>
      </div>
    </section>
  );
};
