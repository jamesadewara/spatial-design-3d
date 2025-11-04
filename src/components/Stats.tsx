import { useEffect, useRef, useState } from "react";
import { Users, Award, TrendingUp, Clock } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Projects Completed",
    description: "Successful launches"
  },
  {
    icon: Users,
    value: 100,
    suffix: "%",
    label: "Happy Clients",
    description: "Satisfaction rate"
  },
  {
    icon: TrendingUp,
    value: 250,
    suffix: "%",
    label: "Average Conversion",
    description: "Increase for clients"
  },
  {
    icon: Clock,
    value: 5,
    suffix: "+",
    label: "Years Experience",
    description: "In digital design"
  },
];

const Counter = ({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <span className="text-5xl font-bold gradient-text">
      {count}{suffix}
    </span>
  );
};

export const Stats = () => {
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
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Results That Speak
          </h2>
          <p className="text-xl text-muted-foreground">
            Numbers that showcase our commitment to excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group relative ${isVisible ? "animate-scale-in" : "opacity-0"}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="relative glass rounded-2xl p-8 text-center h-full flex flex-col items-center justify-center hover:border-primary/50 transition-all duration-300">
                <stat.icon className="w-12 h-12 text-primary mb-4" />
                <Counter end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
                <h3 className="text-lg font-semibold mt-2 mb-1">{stat.label}</h3>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
