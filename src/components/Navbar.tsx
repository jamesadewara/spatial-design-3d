import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { Link } from "react-router-dom";
import navLinks from "@/lib/data";
import NavLinks from "./NavLinks";
import Logo from "./Logo";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [logoRotation, setLogoRotation] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);

      // Simple 3D-ish rotation effect for the logo based on scroll delta
      const delta = y - lastScrollY;
      lastScrollY = y;
      const rotY = Math.max(Math.min(y * 0.08, 25), -25); // rotateY based on scroll position
      const rotX = Math.max(Math.min(delta * 0.6, 10), -10); // rotateX based on scroll delta
      setLogoRotation({ x: rotX, y: rotY });

      // Update active section by checking each known section id
      for (const link of navLinks) {
        const el = document.getElementById(link.route);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(link.route);
            break;
          } else {
            // If none matched we'll keep the previous active until one matches
            if (!navLinks.some((l) => {
              const e = document.getElementById(l.route);
              return e && e.getBoundingClientRect().top <= 120 && e.getBoundingClientRect().bottom >= 120;
            })) {
              setActiveSection(null);
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // run once to seed state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className="fixed top-0 w-full z-40"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold gradient-text flex items-center gap-2">
            <Logo
              src="logo.webp"
              alt="SpatialDesign3D Logo"
              className={`cursor-target user-select-none w-16 h-16 will-change-transform p-2 rounded-xl transition-all duration-300 ${isScrolled ? "glass shadow-lg" : "bg-transparent"
                }`}
              style={{
                transform: `perspective(800px) rotateY(${logoRotation.y}deg) rotateX(${logoRotation.x}deg)`,
                transition: "transform 220ms cubic-bezier(.2,.9,.3,1)",
              }}
            />

            <span className="sr-only">Home</span>
          </Link>

          {/* Desktop Menu */}
          <div
            className={`hidden md:flex items-center gap-4 px-4 py-2 rounded-xl transition-all duration-300 ${isScrolled ? "glass shadow-lg" : "bg-transparent"
              }`}
          >
            {/* Reusable nav links */}
            <NavLinks links={navLinks} onLinkClick={scrollToSection} activeId={activeSection} className="gap-4" />

            <ThemeToggle />
            <Button className="bg-primary cursor-target" variant="hero" size="sm" onClick={() => scrollToSection("cta")}>
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className={`md:hidden bg-primary flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${isScrolled ? "glass shadow-lg" : "bg-transparent"}`}>
            <ThemeToggle />
            <Button
              variant="default"
              size="icon"
              className="cursor-target"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 glass">
            <div className="px-2">
              <NavLinks links={navLinks} onLinkClick={scrollToSection} activeId={activeSection} vertical className="rounded-xl overflow-hidden bg-background/40" />
              <div className="pt-3 px-2">
                <Button variant="hero" size="sm" className="w-full cursor-target" onClick={() => scrollToSection("cta")}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
