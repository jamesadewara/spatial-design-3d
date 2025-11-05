import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Send, Mail, MessageSquare, User } from "lucide-react";
import { MessageCircle, Send as TelegramIcon } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/+2349138113769",
      color: "text-green-500"
    },
    {
      name: "Telegram",
      icon: TelegramIcon,
      url: "https://t.me/SpatialDesign3D",
      color: "text-blue-500"
    },
    {
      name: "Instagram",
      icon: User,
      url: "https://instagram.com/SpatialDesign3D",
      color: "text-pink-500"
    },
    {
      name: "Twitter",
      icon: Send,
      url: "https://twitter.com/james_adew28189",
      color: "text-sky-500"
    },
  ];

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl text-muted-foreground">
              Ready to elevate your digital presence? Get in touch.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form (Sticky) */}
            <div className="lg:sticky lg:top-24 self-start">
              <div className="glass rounded-2xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-10"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <Input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="pl-10 min-h-[120px]"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>
                </div>

                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Send Message
                  <Send className="ml-2" />
                </Button>
              </form>
              </div>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="glass rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Connect With Us</h3>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <link.icon className={`w-6 h-6 ${link.color}`} />
                      <span className="text-sm font-medium group-hover:text-primary transition-colors">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Prefer email? Reach out directly at:
                  </p>
                  <a 
                    href="mailto:contact@spatialdesign3d.com" 
                    className="text-primary hover:underline font-medium"
                  >
                    contact@spatialdesign3d.com
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="glass rounded-2xl overflow-hidden h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.777!2d3.379!3d6.524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnMjYuNCJOIDPCsDIyJzQ0LjQiRQ!5e0!3m2!1sen!2sng!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                />
              </div>

              {/* Additional Info Card */}
              <div className="glass rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>✓ Lightning-fast response time</p>
                  <p>✓ Tailored solutions for your business</p>
                  <p>✓ Proven track record of success</p>
                  <p>✓ Ongoing support and maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
