import { Link } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { MessageCircle, Send, User } from "lucide-react";

export const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold gradient-text block mb-4">
              <img
              src="logo.png"
              className="cursor-target select-none w-64 h-64 will-change-transform p-2  rounded-xl transition-all duration-300"
              alt="SpatialDesign3D Logo"/>
            </Link>
            <p className="text-muted-foreground text-sm">
              Creating outstanding landing pages that convert visitors into customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className=" cursor-target text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/analytics" className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm">
                  Analytics
                </Link>
              </li>
              <li>
                <a href="#" className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="cursor-target text-muted-foreground hover:text-primary transition-colors text-sm">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              <a
                href="https://wa.me/+2349138113769"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/SpatialDesign3D"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/SpatialDesign3D"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <User className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 SpatialDesign3D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
