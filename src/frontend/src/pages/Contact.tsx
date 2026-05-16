import { Layout } from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { useSubmitInquiry } from "@/hooks/useInquiry";
import type { InquiryInput } from "@/types";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 97763 76441",
    href: "tel:+919776376441",
  },
  {
    icon: Mail,
    label: "Email",
    value: "badhaiho1988@gmail.com",
    href: "mailto:badhaiho1988@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bhubaneswar, Odisha",
    href: "https://maps.app.goo.gl/jackV8ExdNLsAxMU9",
  },
];

export function Contact() {
  const [formData, setFormData] = useState<InquiryInput>({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    packageInterest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const mutation = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync(formData);
      setSubmitted(true);
      const parts: string[] = ["New Inquiry from Badhai Ho Website", ""];
      if (formData.name.trim()) parts.push(`Name: ${formData.name}`);
      if (formData.phone.trim()) parts.push(`Phone: ${formData.phone}`);
      if (formData.email.trim()) parts.push(`Email: ${formData.email}`);
      if (formData.eventDate.trim())
        parts.push(`Event Date: ${formData.eventDate}`);
      if (formData.packageInterest.trim())
        parts.push(`Package: ${formData.packageInterest}`);
      if (formData.message.trim()) parts.push(`Message: ${formData.message}`);
      const whatsappUrl = `https://wa.me/919776376441?text=${encodeURIComponent(parts.join("\n"))}`;
      window.open(whatsappUrl, "_blank");
    } catch {
      // handled via mutation.isError
    }
  };

  return (
    <Layout>
      <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-3">
              Get In Touch
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Ready to book your date? Fill in the form below or reach us
              directly via WhatsApp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {submitted ? (
                <div
                  data-ocid="contact.success_state"
                  className="bg-card border border-[#D4AF37] p-10 text-center shadow-gold-glow"
                >
                  <p className="font-display text-3xl font-bold text-[#D4AF37] mb-3">
                    Thank You!
                  </p>
                  <p className="text-muted-foreground font-body">
                    We've received your inquiry and will get back to you within
                    24 hours.
                  </p>
                  <p className="text-muted-foreground font-body mt-2">
                    You can also reach us directly on WhatsApp at +91 97763
                    76441.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.form"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="font-body text-xs text-muted-foreground tracking-wider uppercase block mb-2"
                      >
                        Full Name *
                      </label>
                      <Input
                        id="contact-name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="Your full name"
                        data-ocid="contact.name_input"
                        className="glass-input rounded-lg border-white/10 text-foreground placeholder:text-white/30"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="font-body text-xs text-muted-foreground tracking-wider uppercase block mb-2"
                      >
                        Phone *
                      </label>
                      <Input
                        id="contact-phone"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+91 XXXXX XXXXX"
                        data-ocid="contact.phone_input"
                        className="glass-input rounded-lg border-white/10 text-foreground placeholder:text-white/30"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-body text-xs text-muted-foreground tracking-wider uppercase block mb-2"
                    >
                      Email Address *
                    </label>
                    <Input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="your@email.com"
                      data-ocid="contact.email_input"
                      className="glass-input rounded-lg border-white/10 text-foreground placeholder:text-white/30"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-date"
                        className="font-body text-xs text-muted-foreground tracking-wider uppercase block mb-2"
                      >
                        Event Date
                      </label>
                      <Input
                        id="contact-date"
                        type="date"
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            eventDate: e.target.value,
                          })
                        }
                        data-ocid="contact.date_input"
                        className="bg-card border-border focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact-package"
                        className="font-body text-xs text-muted-foreground tracking-wider uppercase block mb-2"
                      >
                        Package Interest
                      </label>
                      <select
                        id="contact-package"
                        value={formData.packageInterest}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            packageInterest: e.target.value,
                          })
                        }
                        data-ocid="contact.package_select"
                        className="w-full h-10 rounded-md glass-input px-3 text-sm font-body text-foreground"
                      >
                        <option value="">Select a package</option>
                        <option value="silver">Silver Package</option>
                        <option value="gold">Gold Package</option>
                        <option value="platinum">Platinum Package</option>
                        <option value="custom">Custom / Unsure</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-body text-xs text-muted-foreground tracking-wider uppercase block mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your wedding, event date, location, and any special requirements..."
                      rows={5}
                      data-ocid="contact.message_textarea"
                      className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:border-[#D4AF37] focus:outline-none resize-none"
                    />
                  </div>
                  {mutation.isError && (
                    <p
                      data-ocid="contact.error_state"
                      className="text-[#B0B0B0] text-sm font-body"
                    >
                      Something went wrong. Please try WhatsApp or call us
                      directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    data-ocid="contact.submit_button"
                    className="w-full py-3 bg-[#D4AF37] text-[#0F0F0F] font-body font-semibold tracking-widest uppercase transition-smooth hover:bg-[#D4AF37]/90 hover:shadow-gold-glow disabled:opacity-60"
                  >
                    {mutation.isPending ? "Sending..." : "Send Inquiry"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-8"
            >
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.label === "Location" ? "_blank" : undefined}
                  rel={
                    item.label === "Location"
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="flex items-start gap-5 group"
                  data-ocid={`contact.${item.label.toLowerCase()}_link`}
                >
                  <div className="w-12 h-12 border border-[#D4AF37]/30 flex items-center justify-center shrink-0 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 transition-smooth">
                    <item.icon className="h-5 w-5 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-1">
                      {item.label}
                    </p>
                    <p className="font-body text-foreground group-hover:text-[#D4AF37] transition-smooth">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}

              <div className="border-t border-border pt-8">
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase mb-4">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/badhaihofilms?igsh=MWk3MW1oNGZ3YnBjcw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.instagram_link"
                    aria-label="Instagram"
                    className="w-10 h-10 border border-border flex items-center justify-center text-foreground/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-smooth"
                  >
                    <SiInstagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://wa.me/919776376441"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.whatsapp_link"
                    aria-label="WhatsApp"
                    className="w-10 h-10 border border-border flex items-center justify-center text-foreground/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-smooth"
                  >
                    <SiWhatsapp className="h-4 w-4" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid="contact.facebook_link"
                    aria-label="Facebook"
                    className="w-10 h-10 border border-border flex items-center justify-center text-foreground/50 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-smooth"
                  >
                    <SiFacebook className="h-4 w-4" />
                  </a>
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <a
                  href="https://wa.me/919776376441"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="contact.whatsapp_cta"
                  className="inline-flex items-center gap-3 w-full justify-center py-4 bg-card border border-[#D4AF37] text-[#D4AF37] font-body font-semibold tracking-widest uppercase transition-smooth hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
