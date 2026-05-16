import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeaturedFilms } from "@/hooks/useFilms";
import { useGalleryImages } from "@/hooks/useGallery";
import { useSubmitInquiry } from "@/hooks/useInquiry";
import { useFeaturedTestimonials } from "@/hooks/useTestimonials";
import { Link } from "@tanstack/react-router";
import {
  Camera,
  ChevronDown,
  Film,
  Gem,
  Gift,
  Heart,
  Mail,
  MapPin,
  Pause,
  Phone,
  Play,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { SiInstagram, SiWhatsapp } from "react-icons/si";

// ── Data ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: Camera,
    title: "Wedding Photography",
    description:
      "Editorial and candid photography with a luxury cinematic style that preserves every emotion.",
  },
  {
    icon: Film,
    title: "Cinematic Wedding Films",
    description:
      "Full-length cinematic films capturing every emotion of your special day in stunning detail.",
  },
  {
    icon: Heart,
    title: "Pre Wedding Shoots",
    description:
      "Romantic outdoor and studio sessions that tell your unique love story beautifully.",
  },
  {
    icon: Gem,
    title: "Engagement Coverage",
    description:
      "Beautiful, heartfelt coverage of your engagement ceremony and intimate celebrations.",
  },
  {
    icon: Gift,
    title: "Birthday Events",
    description:
      "Milestone birthdays and celebrations captured with premium quality and personal touch.",
  },
  {
    icon: Sparkles,
    title: "Thread Ceremony",
    description:
      "Sacred thread ceremonies documented with respect, artistry, and cultural sensitivity.",
  },
  {
    icon: Play,
    title: "Reels & Social Media Edits",
    description:
      "Short-form cinematic reels perfectly crafted for Instagram and social media sharing.",
  },
];

const fallbackFilms: {
  id: bigint;
  title: string;
  description: string;
  thumbnailUrl: string;
  youtubeUrl: string;
  featured: boolean;
  category: string;
  createdAt: bigint;
}[] = [];

const galleryItems = [
  { id: 1, h: "h-56", img: "/assets/images/wedding1.jpg" },
  { id: 2, h: "h-44", img: "/assets/images/wedding2.jpg" },
  { id: 3, h: "h-64", img: "/assets/images/wedding3.jpg" },
  { id: 4, h: "h-48", img: "/assets/images/wedding4.jpg" },
  { id: 5, h: "h-52", img: "/assets/images/wedding5.jpg" },
  { id: 6, h: "h-44", img: "/assets/images/wedding6.jpg" },
  { id: 7, h: "h-60", img: "/assets/images/wedding7.jpg" },
  { id: 8, h: "h-48", img: "/assets/images/wedding8.jpg" },
];

const fallbackTestimonials = [
  {
    id: 5n,
    name: "Sunita & Dev",
    quote:
      "The team blended into our celebration so naturally. Every candid moment, every tear of happiness — all preserved forever. Highly recommended!",
    rating: 5n,
    photoUrl: "",
    featured: true,
    createdAt: 0n,
  },
];

const featuredFilmsStatic = [
  {
    id: 1,
    src: "/assets/vanani_yashas_mehendi_up_2-019e3074-e391-752a-9287-8c0ed3500306.mp4",
  },
  {
    id: 2,
    src: "/assets/slide_2.mp4",
  },
  {
    id: 3,
    src: "/assets/couple_video_1.mp4",
  },
];

const fallbackPackages = [
  {
    id: 1n,
    name: "Silver",
    price: "Starting from ₹80,000",
    highlighted: false,
    features: [
      "Wedding Photography",
      "8 Hours Coverage",
      "300+ Edited Photos",
      "USB Drive Delivery",
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
      "Cinematic Highlight Film",
      "500+ Edited Photos",
      "Drone Shots",
      "Same-Day Edit Reel",
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
      "Full Feature Film",
      "Pre-Wedding Shoot",
      "Engagement Coverage",
      "Priority Editing",
      "Premium Album",
    ],
  },
];

const _categoryLabels: Record<string, string> = {
  weddingHighlights: "Wedding Highlights",
  engagement: "Engagement Films",
  coupleTeasers: "Couple Teasers",
  reels: "Reels",
};

const reelPreviews = [
  { id: 1, label: "Wedding Highlight 2024" },
  {
    id: 2,
    label: "Engagement Story",
    videoSrc:
      "/assets/wedding_reels_3-019e3074-dbae-77a1-b229-3c2009e9d657.mp4",
  },
  { id: 3, label: "Couple Teaser" },
  { id: 4, label: "Reception Film" },
  { id: 5, label: "Pre-Wedding Reel" },
];

// ── Helpers ──────────────────────────────────────────────────────────────

function GoldDivider({ text }: { text: string }) {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div className="h-px flex-1 max-w-[80px] bg-primary/30" />
      <p className="mx-4 font-display text-primary text-xs tracking-[0.3em] uppercase">
        {text}
      </p>
      <div className="h-px flex-1 max-w-[80px] bg-primary/30" />
    </div>
  );
}

function VideoModal({
  videoId,
  onClose,
}: {
  videoId: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      key="video-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm"
      onClick={onClose}
      data-ocid="video.modal"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-4xl mx-4 aspect-video bg-card border border-primary/30"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="Wedding Film"
          allow="autoplay; fullscreen"
          allowFullScreen
          className="w-full h-full"
        />
        <button
          type="button"
          onClick={onClose}
          data-ocid="video.close_button"
          aria-label="Close video"
          className="absolute -top-4 -right-4 w-8 h-8 bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/80 transition-smooth"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// ── Featured Films Grid (with inline Play/Pause) ─────────────────────────────

function FeaturedFilmsGrid() {
  const [playingIds, setPlayingIds] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  function togglePlay(id: number) {
    const video = videoRefs.current[id];
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlayingIds((prev) => ({ ...prev, [id]: true }));
    } else {
      video.pause();
      setPlayingIds((prev) => ({ ...prev, [id]: false }));
    }
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-5"
      data-ocid="films.list"
    >
      {featuredFilmsStatic.map((film, i) => {
        const isPlaying = !!playingIds[film.id];
        return (
          <motion.div
            key={film.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            data-ocid={`films.item.${i + 1}`}
            className="relative group overflow-hidden aspect-[3/4] bg-[#0F0F0F]"
          >
            <video
              ref={(el) => {
                videoRefs.current[film.id] = el;
              }}
              src={film.src}
              playsInline
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-700"
              onEnded={() =>
                setPlayingIds((prev) => ({ ...prev, [film.id]: false }))
              }
            >
              <track kind="captions" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/70 via-transparent to-transparent" />
            {/* Play / Pause overlay — always visible, larger on hover */}
            <button
              type="button"
              aria-label={isPlaying ? "Pause video" : "Play video"}
              data-ocid={`films.play_button.${i + 1}`}
              onClick={() => togglePlay(film.id)}
              className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none"
            >
              <div
                className={`w-16 h-16 rounded-full border-2 border-[#D4AF37]/80 flex items-center justify-center backdrop-blur-sm shadow-[0_0_24px_rgba(212,175,55,0.35)] transition-all duration-300 ${
                  isPlaying
                    ? "bg-[#0F0F0F]/50 opacity-0 group-hover:opacity-100"
                    : "bg-[#0F0F0F]/40 opacity-100"
                }`}
              >
                {isPlaying ? (
                  <Pause
                    className="h-7 w-7 text-[#D4AF37]"
                    fill="currentColor"
                  />
                ) : (
                  <Play
                    className="h-7 w-7 text-[#D4AF37] ml-1"
                    fill="currentColor"
                  />
                )}
              </div>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export function Home() {
  const filmsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    packageInterest: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { data: featuredFilms } = useFeaturedFilms();
  const { data: testimonials } = useFeaturedTestimonials();
  const { data: galleryData } = useGalleryImages();
  const submitInquiry = useSubmitInquiry();

  const _films =
    featuredFilms && featuredFilms.length > 0 ? featuredFilms : fallbackFilms;
  const _displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;
  // Packages are hardcoded — never fetched from backend to prevent stale canister overrides
  const displayPackages = fallbackPackages;
  // galleryData not used directly; galleryItems is always the fallback visual
  void galleryData;

  function scrollToContact() {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToFilms() {
    filmsRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  function validateForm() {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Valid email is required";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (!formData.message.trim()) errors.message = "Message is required";
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    try {
      await submitInquiry.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        eventDate: formData.eventDate,
        packageInterest: formData.packageInterest,
        message: formData.message,
      });
      setSubmitSuccess(true);
      const whatsappMessage = `New Inquiry from Website:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEvent Date: ${formData.eventDate}\nPackage Interest: ${formData.packageInterest}\nMessage: ${formData.message}`;
      const whatsappUrl = `https://wa.me/919776376441?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, "_blank");
      setFormData({
        name: "",
        email: "",
        phone: "",
        eventDate: "",
        packageInterest: "",
        message: "",
      });
    } catch {
      setFormErrors({ submit: "Something went wrong. Please try again." });
    }
  }

  return (
    <Layout>
      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
        data-ocid="hero.section"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/jhumka_1_1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1 }}
            className="font-body text-xs text-primary tracking-[0.4em] uppercase mb-6"
          >
            Bhubaneswar · Odisha · India
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-4"
          >
            We Don&rsquo;t Just Shoot Weddings.
            <br />
            <span className="text-primary">We Preserve Emotions.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="font-body text-base md:text-lg text-muted-foreground/90 tracking-[0.25em] uppercase italic mt-4 mb-10"
          >
            Let&rsquo;s Celebrate The Occasion
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              type="button"
              data-ocid="hero.book_button"
              onClick={scrollToContact}
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-body font-semibold tracking-widest uppercase transition-smooth hover:bg-primary/90 text-sm"
            >
              Book Your Date
            </button>
            <button
              type="button"
              data-ocid="hero.watch_films_button"
              onClick={scrollToFilms}
              className="inline-flex items-center gap-2 justify-center px-8 py-3 border border-primary text-primary font-body font-semibold tracking-widest uppercase transition-smooth hover:bg-primary hover:text-primary-foreground text-sm"
            >
              <Play className="h-4 w-4" />
              Watch Films
            </button>
          </motion.div>
        </div>
        <motion.button
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          onClick={scrollToFilms}
          aria-label="Scroll down"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce"
        >
          <ChevronDown className="h-8 w-8" />
        </motion.button>
      </section>

      {/* ── 1b. STAY CONNECTED ───────────────────────────────────────────── */}
      <section
        id="instagram"
        className="py-20 lg:py-28 bg-background"
        data-ocid="instagram.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <div className="flex justify-center mb-4">
              <SiInstagram className="h-10 w-10 text-primary" />
            </div>
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              Stay Connected
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Follow Our Work
            </h2>
            <a
              href="https://www.instagram.com/badhaihofilms?igsh=MWk3MW1oNGZ3YnBjcw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="instagram.handle_link"
              className="font-body text-primary hover:text-primary/80 transition-smooth text-sm tracking-widest uppercase"
            >
              @badhaihofilms
            </a>
          </motion.div>
          <div
            className="overflow-x-auto pb-4"
            data-ocid="instagram.reels_slider"
          >
            <div className="flex gap-4 min-w-max">
              {reelPreviews.map((reel, i) => (
                <motion.div
                  key={reel.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`instagram.reel.${i + 1}`}
                  className="relative w-48 h-80 shrink-0 overflow-hidden border border-border group cursor-pointer hover:border-primary/60 transition-smooth"
                >
                  {reel.id === 1 || reel.videoSrc ? (
                    <video
                      src={reel.videoSrc ?? "/assets/video_project_1.mp4"}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="/assets/generated/hero-wedding.dim_1920x1080.jpg"
                      alt={reel.label}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  {reel.id !== 1 && !reel.videoSrc && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full border border-primary/60 flex items-center justify-center bg-background/30 backdrop-blur-sm group-hover:bg-primary/20 transition-smooth">
                        <Play className="h-4 w-4 text-primary ml-0.5" />
                      </div>
                    </div>
                  )}
                  <p className="absolute bottom-3 left-3 right-3 font-body text-xs text-foreground/80 truncate">
                    {reel.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="text-center mt-10">
            <a
              href="https://www.instagram.com/badhaihofilms?igsh=MWk3MW1oNGZ3YnBjcw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="instagram.follow_button"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-body text-sm font-semibold tracking-widest uppercase transition-smooth hover:bg-primary/90"
            >
              <SiInstagram className="h-4 w-4" />
              Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURED FILMS ────────────────────────────────────────────── */}
      <section
        ref={filmsRef}
        id="films"
        className="py-20 lg:py-28 bg-background"
        data-ocid="films.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              Our Work
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Films
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Each film is a unique love story told through cinematic frames,
              genuine emotion, and timeless beauty.
            </p>
          </motion.div>
          <FeaturedFilmsGrid />
          <div className="text-center mt-10">
            <Link
              to="/films"
              data-ocid="films.view_all_button"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-body text-sm font-semibold tracking-widest uppercase transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              More
            </Link>
          </div>
        </div>
      </section>

      <GoldDivider text="Your Love Story. Unveiled." />

      {/* ── 3. SERVICES ──────────────────────────────────────────────────── */}
      <section
        id="services"
        className="py-20 lg:py-28 bg-card/30"
        data-ocid="services.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              What We Offer
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Services
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08, duration: 0.5 }}
                data-ocid={`services.item.${i + 1}`}
                className="bg-card border border-border p-6 group hover:border-primary/60 transition-smooth hover:shadow-[0_0_20px_rgba(212,175,55,0.12)]"
              >
                <div className="w-10 h-10 flex items-center justify-center border border-primary/30 mb-5 group-hover:border-primary group-hover:bg-primary/10 transition-smooth">
                  <service.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-xs text-muted-foreground font-body leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider text="Moments That Last Forever" />

      {/* ── 4. GALLERY PREVIEW ───────────────────────────────────────────── */}
      <section
        id="gallery"
        className="py-20 lg:py-28 bg-background"
        data-ocid="gallery.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              Captured Memories
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Gallery
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Candid emotions, couple portraits, and family moments — every
              frame a timeless memory.
            </p>
          </motion.div>
          <div
            className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
            data-ocid="gallery.list"
          >
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                data-ocid={`gallery.item.${i + 1}`}
                className={`break-inside-avoid relative overflow-hidden group cursor-pointer ${item.h}`}
              >
                <img
                  src={item.img}
                  alt="Wedding memory"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/gallery"
              data-ocid="gallery.view_all_button"
              className="inline-flex items-center gap-2 px-8 py-3 border border-primary text-primary font-body text-sm font-semibold tracking-widest uppercase transition-smooth hover:bg-primary hover:text-primary-foreground"
            >
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. ABOUT ─────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-20 lg:py-28 bg-card/20"
        data-ocid="about.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
                Our Story
              </p>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                Crafting Memories That Last Forever
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed text-sm">
                <p>
                  At Badhai Ho – Wedding &amp; Event Films, we believe every
                  celebration has a story worth remembering.
                </p>
                <p>
                  Led by an experienced editor and creative storyteller with{" "}
                  <span className="text-primary font-semibold">16+ years</span>{" "}
                  of experience in video editing and visual storytelling, our
                  team focuses on capturing real emotions, beautiful moments,
                  and timeless memories.
                </p>
                <p>
                  We work with a passionate team of skilled photographers and
                  videographers who have strong experience in wedding and event
                  coverage. From candid emotions to cinematic wedding films,
                  every frame is created with creativity, care, and attention to
                  detail.
                </p>
                <p>
                  Our style is simple, emotional, cinematic, and modern. We do
                  not just record events — we create memories that feel alive
                  even after years.
                </p>
                <p>
                  Whether it is a wedding, engagement, birthday, or special
                  celebration, our goal is to make every occasion look
                  beautiful, natural, and unforgettable.
                </p>
              </div>
              <Link
                to="/about"
                data-ocid="about.learn_more_button"
                className="inline-flex items-center gap-2 mt-8 text-primary font-body text-sm font-semibold tracking-widest uppercase transition-smooth hover:gap-4 border-b border-primary pb-1"
              >
                Learn More About Us
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-5"
            >
              {/* Owner portrait — premium cinematic treatment */}
              <div className="relative rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow-[0_0_50px_rgba(212,175,55,0.12)]">
                <img
                  src="/assets/images/owner-photo.jpg"
                  alt="Creative Director – Badhai Ho Wedding & Event Films"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/20 to-transparent" />
                {/* Glass info overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4 backdrop-blur-sm bg-[#0F0F0F]/40 border-t border-[#D4AF37]/25">
                  <p className="font-display text-sm font-bold text-[#FFFFFF] mb-0.5">
                    Our Creative Director
                  </p>
                  <p className="font-body text-[11px] text-[#B0B0B0] tracking-widest uppercase">
                    16+ Years · Cinematic Storyteller
                  </p>
                </div>
                {/* Quote ribbon */}
                <p className="absolute top-4 left-4 right-4 font-display text-sm italic text-[#D4AF37]/90 leading-snug drop-shadow-md">
                  &ldquo;Let&rsquo;s Celebrate The Occasion&rdquo;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GoldDivider text="Words From Our Couples" />

      {/* ── 6. TESTIMONIALS ──────────────────────────────────────────────── */}
      <section
        id="testimonials"
        className="py-20 lg:py-28 bg-background"
        data-ocid="testimonials.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              Kind Words
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
          </motion.div>
          <div
            className="flex flex-wrap justify-center gap-5"
            data-ocid="testimonials.list"
          >
            {fallbackTestimonials.slice(0, 1).map((t, i) => (
              <motion.div
                key={t.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                data-ocid={`testimonials.item.${i + 1}`}
                className="bg-card border border-border p-6 hover:border-primary/40 transition-smooth max-w-xl w-full"
              >
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: Number(t.rating) }, (_, s) => (
                    <Star
                      key={`star-${t.id.toString()}-${s}`}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="font-body text-sm text-foreground/80 leading-relaxed italic mb-5">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-display text-sm font-bold text-primary">
                    — {t.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. PACKAGES ──────────────────────────────────────────────────── */}
      <section
        id="packages"
        className="py-20 lg:py-28 bg-card/20"
        data-ocid="packages.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              Pricing
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Packages
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Transparent pricing for premium cinematic wedding experiences.
            </p>
          </motion.div>
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            data-ocid="packages.list"
          >
            {displayPackages.slice(0, 3).map((pkg, i) => (
              <motion.div
                key={pkg.id.toString()}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                data-ocid={`packages.item.${i + 1}`}
                className={`relative bg-card border p-8 transition-smooth ${
                  pkg.highlighted
                    ? "border-primary shadow-[0_0_30px_rgba(212,175,55,0.15)]"
                    : "border-border hover:border-primary/40"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary px-4 py-1">
                    <p className="text-xs font-body font-bold text-primary-foreground tracking-widest uppercase">
                      Most Popular
                    </p>
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                  {pkg.name} Package
                </h3>
                <p className="text-primary font-body font-semibold text-lg mb-6">
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-muted-foreground font-body"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  data-ocid={`packages.book_button.${i + 1}`}
                  onClick={scrollToContact}
                  className={`w-full flex items-center justify-center py-3 font-body text-sm font-semibold tracking-widest uppercase transition-smooth ${
                    pkg.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  Inquire Now
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CONTACT ───────────────────────────────────────────────────── */}
      <section
        ref={contactRef}
        id="contact"
        className="py-20 lg:py-28 bg-card/20"
        data-ocid="contact.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="font-body text-xs text-primary tracking-[0.3em] uppercase mb-3">
              Get In Touch
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Book Your Date
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-body">
              Ready to preserve your story forever? Reach out and let&rsquo;s
              create something beautiful together.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              {submitSuccess ? (
                <div
                  className="bg-card border border-primary/40 p-10 text-center"
                  data-ocid="contact.success_state"
                >
                  <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Your inquiry has been received. We will contact you within
                    24 hours to discuss your special day.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 text-primary font-body text-sm tracking-widest uppercase border-b border-primary pb-0.5 transition-smooth hover:text-primary/80"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.form"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block font-body text-xs text-muted-foreground tracking-wider uppercase mb-1.5"
                      >
                        Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        data-ocid="contact.name_input"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        onBlur={() => {
                          if (!formData.name.trim())
                            setFormErrors((p) => ({
                              ...p,
                              name: "Name is required",
                            }));
                          else setFormErrors((p) => ({ ...p, name: "" }));
                        }}
                        className="w-full glass-input rounded-lg px-4 py-3 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-smooth"
                      />
                      {formErrors.name && (
                        <p
                          className="text-[#B0B0B0] text-xs mt-1"
                          data-ocid="contact.name_input.field_error"
                        >
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block font-body text-xs text-muted-foreground tracking-wider uppercase mb-1.5"
                      >
                        Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        data-ocid="contact.email_input"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        onBlur={() => {
                          if (
                            !formData.email.trim() ||
                            !/\S+@\S+\.\S+/.test(formData.email)
                          )
                            setFormErrors((p) => ({
                              ...p,
                              email: "Valid email required",
                            }));
                          else setFormErrors((p) => ({ ...p, email: "" }));
                        }}
                        className="w-full glass-input rounded-lg px-4 py-3 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-smooth"
                      />
                      {formErrors.email && (
                        <p
                          className="text-[#B0B0B0] text-xs mt-1"
                          data-ocid="contact.email_input.field_error"
                        >
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block font-body text-xs text-muted-foreground tracking-wider uppercase mb-1.5"
                      >
                        Phone *
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        data-ocid="contact.phone_input"
                        placeholder="+91 XXXXX XXXXX"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        onBlur={() => {
                          if (!formData.phone.trim())
                            setFormErrors((p) => ({
                              ...p,
                              phone: "Phone is required",
                            }));
                          else setFormErrors((p) => ({ ...p, phone: "" }));
                        }}
                        className="w-full glass-input rounded-lg px-4 py-3 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-smooth"
                      />
                      {formErrors.phone && (
                        <p
                          className="text-[#B0B0B0] text-xs mt-1"
                          data-ocid="contact.phone_input.field_error"
                        >
                          {formErrors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="contact-date"
                        className="block font-body text-xs text-muted-foreground tracking-wider uppercase mb-1.5"
                      >
                        Event Date
                      </label>
                      <input
                        id="contact-date"
                        type="date"
                        data-ocid="contact.date_input"
                        value={formData.eventDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            eventDate: e.target.value,
                          })
                        }
                        className="w-full glass-input rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-smooth"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-package"
                      className="block font-body text-xs text-muted-foreground tracking-wider uppercase mb-1.5"
                    >
                      Package Interest
                    </label>
                    <select
                      id="contact-package"
                      data-ocid="contact.package_select"
                      value={formData.packageInterest}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          packageInterest: e.target.value,
                        })
                      }
                      className="w-full glass-input rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:border-primary transition-smooth"
                    >
                      <option value="">Select a package</option>
                      <option value="silver">
                        Silver Package — From ₹80,000
                      </option>
                      <option value="gold">
                        Gold Package — From ₹1,20,000
                      </option>
                      <option value="platinum">
                        Platinum Package — Custom
                      </option>
                      <option value="custom">Custom / Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-body text-xs text-muted-foreground tracking-wider uppercase mb-1.5"
                    >
                      Message *
                    </label>
                    <textarea
                      id="contact-message"
                      data-ocid="contact.message_textarea"
                      rows={4}
                      placeholder="Tell us about your special day..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      onBlur={() => {
                        if (!formData.message.trim())
                          setFormErrors((p) => ({
                            ...p,
                            message: "Message is required",
                          }));
                        else setFormErrors((p) => ({ ...p, message: "" }));
                      }}
                      className="w-full glass-input rounded-lg px-4 py-3 font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary transition-smooth resize-none"
                    />
                    {formErrors.message && (
                      <p
                        className="text-[#B0B0B0] text-xs mt-1"
                        data-ocid="contact.message_textarea.field_error"
                      >
                        {formErrors.message}
                      </p>
                    )}
                  </div>
                  {formErrors.submit && (
                    <p
                      className="text-[#B0B0B0] text-sm"
                      data-ocid="contact.form.error_state"
                    >
                      {formErrors.submit}
                    </p>
                  )}
                  <Button
                    type="submit"
                    data-ocid="contact.submit_button"
                    disabled={submitInquiry.isPending}
                    className="w-full bg-primary text-primary-foreground font-body text-sm font-semibold tracking-widest uppercase py-6 hover:bg-primary/90 transition-smooth disabled:opacity-60"
                  >
                    {submitInquiry.isPending ? "Sending..." : "Send Inquiry"}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-2 space-y-5"
            >
              <a
                href="https://wa.me/919776376441"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="contact.whatsapp_button"
                className="flex items-center gap-4 w-full px-6 py-5 bg-primary text-primary-foreground transition-smooth hover:bg-primary/90"
              >
                <SiWhatsapp className="h-7 w-7 shrink-0" />
                <div>
                  <p className="font-body font-bold tracking-wider uppercase text-sm">
                    Chat on WhatsApp
                  </p>
                  <p className="font-body text-xs text-primary-foreground/80">
                    +91 97763 76441
                  </p>
                </div>
              </a>
              <div className="bg-card border border-border p-6 space-y-4">
                <p className="font-display text-lg font-bold text-foreground mb-4">
                  Contact Details
                </p>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Phone className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="tel:+919776376441"
                    className="hover:text-primary transition-smooth font-body"
                    data-ocid="contact.phone_link"
                  >
                    +91 97763 76441
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <Mail className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="mailto:badhaiho1988@gmail.com"
                    className="hover:text-primary transition-smooth font-body break-all"
                    data-ocid="contact.email_link"
                  >
                    badhaiho1988@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm text-foreground/80">
                  <SiInstagram className="h-4 w-4 text-primary shrink-0" />
                  <a
                    href="https://www.instagram.com/badhaihofilms?igsh=MWk3MW1oNGZ3YnBjcw%3D%3D&utm_source=qr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-smooth font-body"
                    data-ocid="contact.instagram_link"
                  >
                    @badhaihofilms
                  </a>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/80">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-body">Bhubaneswar, Odisha</p>
                    <a
                      href="https://maps.app.goo.gl/jackV8ExdNLsAxMU9?g_st=iwb"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-smooth text-xs font-body mt-0.5 inline-block"
                      data-ocid="contact.maps_link"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>
              </div>
              <div className="border border-primary/30 p-6 text-center">
                <p className="font-display text-xl italic text-primary">
                  &ldquo;Let&rsquo;s Celebrate The Occasion&rdquo;
                </p>
                <p className="font-body text-xs text-muted-foreground tracking-widest uppercase mt-2">
                  Badhai Ho – Wedding &amp; Event Films
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <VideoModal
            videoId={activeVideo}
            onClose={() => setActiveVideo(null)}
          />
        )}
      </AnimatePresence>
    </Layout>
  );
}
