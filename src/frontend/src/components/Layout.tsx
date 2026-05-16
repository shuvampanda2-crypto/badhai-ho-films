import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Link, useRouterState } from "@tanstack/react-router";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Films", href: "/films" },
  { label: "Gallery", href: "/gallery" },
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: close menu on path change
  useEffect(() => {
    setMenuOpen(false);
  }, [currentPath]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header
        data-ocid="nav.header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "glass-strong border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              to="/"
              data-ocid="nav.logo_link"
              className="flex items-center"
            >
              <img
                src="/assets/logo.png"
                alt="Badhai Ho Films"
                className="h-9 w-auto object-contain md:h-11 lg:h-12"
              />
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-8"
              data-ocid="nav.desktop_links"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  data-ocid={`nav.link.${link.label.toLowerCase()}`}
                  className={`text-sm font-body tracking-wider uppercase transition-smooth relative group ${
                    currentPath === link.href
                      ? "text-[#D4AF37]"
                      : "text-foreground/70 hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-[#D4AF37] transition-all duration-300 ${
                      currentPath === link.href
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </nav>

            {/* Book CTA */}
            <Link
              to="/contact"
              data-ocid="nav.book_button"
              className="hidden lg:inline-flex items-center px-6 py-2 bg-[#D4AF37] text-[#0F0F0F] font-body text-sm font-semibold tracking-wider uppercase transition-smooth hover:bg-[#D4AF37]/90 hover:shadow-gold-glow"
            >
              Book Your Date
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              data-ocid="nav.hamburger_button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="lg:hidden p-2 text-foreground"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            data-ocid="nav.mobile_menu"
            className="fixed inset-0 z-30 glass-strong flex flex-col items-center justify-center gap-8 lg:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={link.href}
                  data-ocid={`nav.mobile_link.${link.label.toLowerCase()}`}
                  className={`font-display text-3xl font-bold tracking-wide transition-smooth ${
                    currentPath === link.href
                      ? "text-[#D4AF37]"
                      : "text-foreground hover:text-[#D4AF37]"
                  }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                to="/contact"
                data-ocid="nav.mobile_book_button"
                className="mt-4 inline-flex items-center px-8 py-3 bg-[#D4AF37] text-[#0F0F0F] font-body font-semibold tracking-widest uppercase transition-smooth hover:bg-[#D4AF37]/90"
              >
                Book Your Date
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border" data-ocid="footer">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {/* Brand */}
            <div>
              <p className="font-display text-2xl font-bold text-[#D4AF37] mb-2">
                Badhai Ho
              </p>
              <p className="text-xs text-muted-foreground tracking-[0.25em] uppercase mb-4">
                Wedding &amp; Event Films
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Capturing emotions, preserving memories. Every wedding tells a
                story — we make sure yours is never forgotten.
              </p>
              <p className="mt-4 text-sm italic text-[#D4AF37]/80 font-display">
                &ldquo;Let&rsquo;s Celebrate The Occasion&rdquo;
              </p>
            </div>

            {/* Quick links */}
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Explore
              </p>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      data-ocid={`footer.link.${link.label.toLowerCase()}`}
                      className="text-sm text-foreground/70 hover:text-[#D4AF37] transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Get In Touch
              </p>
              <div className="flex justify-center mb-6">
                <img
                  src="/assets/logo_footer.png"
                  alt="Badhai Ho Films"
                  className="w-auto object-contain mx-auto"
                  style={{ maxWidth: "280px", maxHeight: "160px" }}
                />
              </div>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-foreground/70">
                  <Phone className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <a
                    href="tel:+919776376441"
                    className="hover:text-[#D4AF37] transition-smooth"
                  >
                    +91 97763 76441
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm text-foreground/70">
                  <Mail className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <a
                    href="mailto:badhaiho1988@gmail.com"
                    className="hover:text-[#D4AF37] transition-smooth break-all"
                  >
                    badhaiho1988@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3 text-sm text-foreground/70">
                  <MapPin className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span>Bhubaneswar, Odisha</span>
                </li>
              </ul>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://www.instagram.com/badhaihofilms?igsh=MWk3MW1oNGZ3YnBjcw%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.instagram_link"
                  aria-label="Instagram"
                  className="text-foreground/50 hover:text-[#D4AF37] transition-smooth"
                >
                  <SiInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://wa.me/919776376441"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.whatsapp_link"
                  aria-label="WhatsApp"
                  className="text-foreground/50 hover:text-[#D4AF37] transition-smooth"
                >
                  <SiWhatsapp className="h-5 w-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="footer.facebook_link"
                  aria-label="Facebook"
                  className="text-foreground/50 hover:text-[#D4AF37] transition-smooth"
                >
                  <SiFacebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Badhai Ho &ndash; Wedding &amp;
              Event Films. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with love using{" "}
              <a
                href="https://www.shuvamcreates.co.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline"
              >
                shuvamcreates
              </a>
            </p>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
}
