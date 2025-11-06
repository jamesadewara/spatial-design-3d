import { useEffect, useRef, useState } from "react";
import { Box } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import Section from "./Section";
import SectionHeader from "./SectionHeader";
import { ScrollPinContainer } from "./ScrollPinContainer";
import ModelViewer from "./ModelViewer";

export const About = () => {
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
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-muted/30 relative min-h-screen flex items-center justify-center overflow-hidden flex-col"
    >
      <div className="container mx-auto px-4">
        <SectionHeader title="Crafting Digital Experiences That Convert" />
        <ScrollPinContainer
          className="grid lg:grid-cols-2 gap-12 items-start"
          start="top-=15% top"
          end="bottom top"
          reverseOrder={true}
          pinSpacing={true}
          pinChildren={
            <div className="order-2 lg:order-1">
              {/* 3D Visual - Right Column */}
              <div className="lg:sticky lg:top-54 self-start">
                <div
                  className={`flex justify-center w-full ${
                    isVisible ? "animate-slide-left" : "opacity-0"
                  }`}
                >
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[28rem] lg:h-[28rem] mx-auto">
                    <div className="cursor-target absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full animate-float">
                        <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-6 blur-2xl" />
                        <div className="w-full h-full relative glass rounded-3xl p-12 flex items-center justify-center">
                          <ModelViewer
                            src="/assets/3d/vr.glb"
                            placeholder="assets/img/vr.png"
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
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <div
                      className="absolute bottom-0 left-0 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse"
                      style={{ animationDelay: "1s" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <div className={`order-1 lg:order-2 space-y-8 ${isVisible ? "animate-slide-right" : "opacity-0"}`}>
            <ScrollReveal baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={10}>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p><strong className="text-foreground">What I Do:</strong> I create stunning, high‑performance landing pages that don’t just look beautiful—they drive results.</p>
                <p><strong className="text-foreground">How I Do It:</strong> By combining cutting‑edge design principles with conversion‑focused strategies, every element is engineered to engage your audience and guide them toward action.</p>
                <p><strong className="text-foreground">Why I Do It:</strong> Because your business deserves more than a website. You deserve a powerful digital presence that works as hard as you do, turning visitors into customers and clicks into conversions.</p>
                <p className="pt-4">Every pixel, every interaction, and every element is crafted with purpose. I don’t just build websites—I engineer conversion machines that transform your digital presence into your most powerful business asset.</p>
                <p>From the initial consultation to the final launch and beyond, you’ll have a dedicated partner focused on one thing: making your online presence work harder than ever before.</p>
              </div>
            </ScrollReveal>
          </div>
        </ScrollPinContainer>
      </div>
    </section>
  );
};
