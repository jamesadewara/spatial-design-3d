import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export const CTA = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Ready to Transform Your Digital Presence?
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join dozens of businesses that have already elevated their online presence.
            Let's create something extraordinary together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button className="cursor-target" variant="hero" size="xl" onClick={scrollToContact}>
              Start Your Project
              <ArrowRight className="ml-2" />
            </Button>
            <Button className="cursor-target bg-transparent hover:bg-transparent" variant="outline" size="xl" asChild>
              <a
                href="https://t.me/SpatialDesign3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule a Call
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
