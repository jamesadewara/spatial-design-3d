import { useEffect, useState } from "react";

const companies = [
  { name: "TechCorp", logo: "TC" },
  { name: "DesignHub", logo: "DH" },
  { name: "StartupXYZ", logo: "SX" },
  { name: "InnovateCo", logo: "IC" },
  { name: "CreativeSpace", logo: "CS" },
  { name: "BrandMakers", logo: "BM" },
  { name: "DigitalEdge", logo: "DE" },
  { name: "FutureNow", logo: "FN" },
];

export const Companies = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Duplicate the array for seamless loop
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-16 overflow-hidden bg-background">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Trusted By Industry Leaders
        </h2>
        <p className="text-center text-muted-foreground">
          Join the brands that chose excellence
        </p>
      </div>

      <div className="relative">
        <div className="flex gap-8" style={{ transform: `translateX(-${offset}%)` }}>
          {duplicatedCompanies.map((company, index) => (
            <div
              key={index}
              className="flex-shrink-0 glass rounded-xl p-8 w-48 h-32 flex items-center justify-center hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {company.logo}
                </div>
                <div className="text-sm text-muted-foreground">
                  {company.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
