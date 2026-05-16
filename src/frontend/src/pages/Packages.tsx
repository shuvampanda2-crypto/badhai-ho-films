import { Layout } from "@/components/Layout";
import { usePackages } from "@/hooks/usePackages";
import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { motion } from "motion/react";

const fallbackPackages = [
  {
    id: 1n,
    name: "Silver",
    price: "Starting from ₹80,000",
    highlighted: false,
    features: [
      "Wedding Photography",
      "8 Hours Coverage",
      "500+ Edited Photos",
      "Online Gallery Access",
      "USB Drive Delivery",
      "Basic Retouching",
    ],
  },
  {
    id: 2n,
    name: "Gold",
    price: "Starting from ₹1,20,000",
    highlighted: true,
    features: [
      "Wedding Photography + Film",
      "Full Day Coverage",
      "Cinematic Highlight Film (10 min)",
      "1000+ Edited Photos",
      "Aerial Drone Shots",
      "Same-Day Edit Reel",
      "Premium Album",
      "Engagement Session",
    ],
  },
  {
    id: 3n,
    name: "Platinum",
    price: "Custom Pricing",
    highlighted: false,
    features: [
      "Complete Wedding Coverage",
      "Multi-Day Events",
      "Full Feature Film (45+ min)",
      "Pre-Wedding Shoot",
      "Engagement Coverage",
      "Priority Editing & Delivery",
      "Luxury Fine Art Album",
      "Unlimited Revisions",
      "Social Media Reels",
    ],
  },
];

export function Packages() {
  const { data: packagesData } = usePackages();
  const packages =
    packagesData && packagesData.length > 0 ? packagesData : fallbackPackages;

  return (
    <Layout>
      <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="font-body text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-3">
              Investment
            </p>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Our Packages
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Choose the package that best fits your vision. All packages
              include our signature cinematic touch.
            </p>
          </motion.div>

          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            data-ocid="packages.list"
          >
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id.toString()}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                data-ocid={`packages.item.${i + 1}`}
                className={`relative glass-card rounded-2xl p-8 transition-smooth ${
                  pkg.highlighted
                    ? "border-[#D4AF37]/70 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                    : "hover:border-white/15"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] px-6 py-1.5">
                    <p className="text-xs font-body font-bold text-[#0F0F0F] tracking-widest uppercase">
                      Most Popular
                    </p>
                  </div>
                )}
                <div className="mb-8">
                  <h2 className="font-display text-3xl font-bold text-foreground mb-3">
                    {pkg.name} Package
                  </h2>
                  <p className="text-xl text-[#D4AF37] font-body font-semibold">
                    {pkg.price}
                  </p>
                </div>
                <ul className="space-y-4 mb-10">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm font-body text-foreground/80"
                    >
                      <Check className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  data-ocid={`packages.book_button.${i + 1}`}
                  className={`block text-center py-3 font-body text-sm font-semibold tracking-widest uppercase transition-smooth ${
                    pkg.highlighted
                      ? "bg-[#D4AF37] text-[#0F0F0F] hover:bg-[#D4AF37]/90 hover:shadow-gold-glow"
                      : "border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F0F0F]"
                  }`}
                >
                  Book This Package
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-16 glass-card rounded-2xl p-10 text-center"
          >
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Need a Custom Quote?
            </h3>
            <p className="text-muted-foreground font-body mb-6 max-w-lg mx-auto">
              Every wedding is unique. Contact us for a fully customised package
              tailored to your event.
            </p>
            <a
              href="https://wa.me/919776376441"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="packages.whatsapp_cta"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-[#0F0F0F] font-body text-sm font-semibold tracking-widest uppercase transition-smooth hover:bg-[#D4AF37]/90"
            >
              Chat on WhatsApp
            </a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
