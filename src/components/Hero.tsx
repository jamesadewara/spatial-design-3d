import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Section from "./Section";
import GradientFluidText from "./GradientFluidText";

export const Hero = () => {
  const scrollToSection = (id) => {
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

      {/* <div
        className="w-dvw h-screen absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(assets/img/demo.jpg)` }}
      /> */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10 lg:space-y-12">
            <div className="w-full flex flex-col justify-center items-center">
              {/* Main Headline */}

<GradientFluidText
  text="Create Highly Converting Landing Pages That Convert"
  fromColor="from-blue-500"
  viaColor="via-pink-500"
  toColor="to-purple-600"
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