import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import { Award, Camera, Film, Heart } from "lucide-react";
import { motion } from "motion/react";

const stats = [
  { value: "16+", label: "Years of Experience" },
  { value: "500+", label: "Weddings Covered" },
  { value: "1000+", label: "Happy Couples" },
  { value: "50+", label: "Award-Winning Films" },
];

const values = [
  {
    icon: Film,
    title: "Cinematic Vision",
    description:
      "Every frame is composed with the eye of a filmmaker, not just a photographer.",
  },
  {
    icon: Heart,
    title: "Emotional Storytelling",
    description:
      "We focus on real emotions, candid moments, and genuine connections.",
  },
  {
    icon: Camera,
    title: "Technical Excellence",
    description:
      "State-of-the-art equipment and 16+ years of editing expertise.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Luxury post-production with color grading, sound design, and precision editing.",
  },
];

export function About() {
  return (
    <Layout>
      <div className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Hero */}
        <section className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-3">
                Our Story
              </p>
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                We Live for
                <br />
                <span className="text-[#D4AF37]">Your Moments.</span>
              </h1>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                At Badhai Ho – Wedding &amp; Event Films, we believe every
                celebration has a story worth remembering. Led by an experienced
                editor and creative storyteller with 16+ years of experience in
                video editing and visual storytelling, our team focuses on
                capturing real emotions, beautiful moments, and timeless
                memories.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                We work with a passionate team of skilled photographers and
                videographers who have strong experience in wedding and event
                coverage. From candid emotions to cinematic wedding films, every
                frame is created with creativity, care, and attention to detail.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Our style is simple, emotional, cinematic, and modern. We do not
                just record events — we create memories that feel alive even
                after years.
              </p>
              <p className="font-display text-lg italic text-[#D4AF37] mb-8">
                &ldquo;Let&rsquo;s Celebrate The Occasion&rdquo;
              </p>
              <Link
                to="/contact"
                data-ocid="about.contact_button"
                className="inline-flex items-center px-8 py-3 bg-[#D4AF37] text-[#0F0F0F] font-body text-sm font-semibold tracking-widest uppercase transition-smooth hover:bg-[#D4AF37]/90"
              >
                Work With Us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src="/assets/generated/hero-wedding.dim_1920x1080.jpg"
                alt="Badhai Ho Films"
                className="w-full aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-[#D4AF37] px-6 py-4">
                <p className="font-display text-3xl font-bold text-[#0F0F0F]">
                  16+
                </p>
                <p className="font-body text-xs text-[#0F0F0F]/80 tracking-widest uppercase">
                  Years Experience
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="glass-strong border-t border-b border-white/10 py-14 mb-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <p className="font-display text-4xl lg:text-5xl font-bold text-[#D4AF37] mb-2">
                    {stat.value}
                  </p>
                  <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="font-body text-xs text-[#D4AF37] tracking-[0.3em] uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="font-display text-4xl font-bold text-foreground">
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-7 text-center hover:border-[#D4AF37]/30 transition-smooth"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-lg glass border-[#D4AF37]/25 mx-auto mb-5">
                  <v.icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
