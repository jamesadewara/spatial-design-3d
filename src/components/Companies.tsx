import { useEffect, useState } from "react";
import SectionHeader from "./SectionHeader";
import LogoLoop from "./LogoLoop";

const techCompanies = [
  { src: "assets/img/icons/apple.svg", alt: "Apple", href: "https://apple.com" },
  { src: "assets/img/icons/google.svg", alt: "Google", href: "https://google.com" },
  { src: "assets/img/icons/microsoft.svg", alt: "Microsoft", href: "https://microsoft.com" },
  { src: "assets/img/icons/meta.svg", alt: "Meta", href: "https://meta.com" },
  { src: "assets/img/icons/tesla.svg", alt: "Tesla", href: "https://tesla.com" }
];

export const Companies = () => {
  return (
    <section className="py-20 overflow-hidden bg-gradient-to-b from-background to-gray-50/30 dark:to-gray-900/30">
      <div className="container mx-auto px-4 mb-12">
        <SectionHeader 
          align="center" 
          title="Trusted By Industry Leaders" 
          subtitle="Join thousands of brands that trust our platform for excellence and innovation"
          className="max-w-3xl mx-auto"
        />
      </div>

      <div className="relative">
        <LogoLoop
          logos={techCompanies}
          speed={80}
          direction="left"
          logoHeight={160}
          gap={32}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          ariaLabel="Our technology partners and clients"
          className="py-6"
        />
        
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />
      </div>
    </section>
  );
};