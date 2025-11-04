import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Stats } from "@/components/Stats";
import { Services } from "@/components/Services";
import { StickyScroll } from "@/components/StickyScroll";
import { Companies } from "@/components/Companies";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import TargetCursor from "@/components/TargetCursor";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <StickyScroll />
      <Companies />
      <Testimonials />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
