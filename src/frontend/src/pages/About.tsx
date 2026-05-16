import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import { Award, Camera, Film, Heart } from "lucide-react";
import { motion } from "motion/react";

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
              {/* Owner portrait with gold border + cinematic glow */}
              <div className="relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[#D4AF37]/60 via-[#D4AF37]/20 to-transparent" />
                <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(212,175,55,0.18)]">
                  <img
                    src="/assets/images/owner-photo.jpg"
                    alt="Founder – Badhai Ho Wedding & Event Films"
                    className="w-full aspect-[4/5] object-cover"
                  />
                  {/* Cinematic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 via-transparent to-transparent" />
                  {/* Glass name tag */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-md bg-[#0F0F0F]/50 border-t border-[#D4AF37]/30">
                    <p className="font-display text-base font-bold text-[#FFFFFF] mb-0.5">
                      Creative Director &amp; Editor
                    </p>
                    <p className="font-body text-xs text-[#B0B0B0] tracking-widest uppercase">
                      Badhai Ho – Wedding &amp; Event Films
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
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
