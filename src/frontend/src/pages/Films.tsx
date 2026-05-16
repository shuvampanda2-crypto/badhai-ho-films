import { Layout } from "@/components/Layout";
import { Link } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";

// ── Hardcoded local films — DO NOT replace with dynamic data ────────────────
const FILMS = [
  {
    id: 1,
    src: "/assets/vanani_yashas_mehendi_up_2-019e3074-e391-752a-9287-8c0ed3500306.mp4",
    label: "Cinematic Wedding Film",
    description:
      "A timeless love story captured through cinematic frames and genuine emotion.",
  },
  {
    id: 2,
    src: "/assets/slide_2.mp4",
    label: "Wedding Highlights",
    description:
      "Every beautiful moment, every tear of joy — preserved forever in stunning detail.",
  },
  {
    id: 3,
    src: "/assets/couple_video_1.mp4",
    label: "Couple Teaser",
    description:
      "Two souls, one beautiful journey told through golden light and heartfelt moments.",
  },
] as const;

// ── Film Card with inline Play/Pause ────────────────────────────────────────

interface FilmCardProps {
  film: (typeof FILMS)[number];
  index: number;
}

function FilmCard({ film, index }: FilmCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.1,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`films.item.${index + 1}`}
      className="group relative overflow-hidden bg-[#0F0F0F] aspect-video"
    >
      {/* Video element — starts paused, plays with audio on click */}
      <video
        ref={videoRef}
        src={film.src}
        playsInline
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        onEnded={() => setIsPlaying(false)}
      >
        <track kind="captions" />
      </video>

      {/* Bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-[#0F0F0F]/10 to-transparent pointer-events-none" />

      {/* Play / Pause button overlay */}
      <button
        type="button"
        aria-label={isPlaying ? "Pause video" : "Play video"}
        data-ocid={`films.play_button.${index + 1}`}
        onClick={togglePlay}
        className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <div
          className={`w-16 h-16 rounded-full border-2 border-[#D4AF37] flex items-center justify-center bg-[#0F0F0F]/50 backdrop-blur-sm shadow-[0_0_28px_rgba(212,175,55,0.4)] transition-all duration-300 hover:bg-[#D4AF37]/20 hover:scale-110 ${
            isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100"
          }`}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 text-[#D4AF37]" fill="currentColor" />
          ) : (
            <Play className="h-7 w-7 text-[#D4AF37] ml-1" fill="currentColor" />
          )}
        </div>
      </button>

      {/* Card footer */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pointer-events-none">
        <span className="inline-block px-2.5 py-0.5 text-[10px] font-body tracking-widest uppercase border rounded-sm bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30 mb-2">
          {film.label}
        </span>
        <p className="font-body text-xs text-[#B0B0B0] line-clamp-2 leading-relaxed">
          {film.description}
        </p>
      </div>
    </motion.div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export function Films() {
  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card/30 border-b border-white/8 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-[#D4AF37]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background/60 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="container mx-auto px-4 lg:px-8 text-center relative z-10"
        >
          <p className="font-body text-xs text-[#D4AF37] tracking-[0.35em] uppercase mb-4">
            Badhai Ho Films
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-5">
            Our Wedding Films
          </h1>
          <p className="font-body text-muted-foreground max-w-lg mx-auto text-base leading-relaxed">
            Every frame a feeling. Every film a forever memory crafted with
            cinematic artistry and emotional depth.
          </p>
        </motion.div>
      </section>

      {/* Films Grid */}
      <section
        className="py-16 lg:py-24 bg-background"
        data-ocid="films.section"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center font-body text-xs text-[#B0B0B0] tracking-[0.3em] uppercase mb-12"
          >
            Click any film to play with audio
          </motion.p>

          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
            data-ocid="films.grid"
          >
            {FILMS.map((film, i) => (
              <FilmCard key={film.id} film={film} index={i} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="font-body text-sm text-[#B0B0B0] mb-6">
              Want your love story captured like this?
            </p>
            <Link
              to="/"
              data-ocid="films.book_cta_button"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#D4AF37] text-[#0F0F0F] font-body text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#D4AF37]/90 hover:shadow-[0_0_24px_rgba(212,175,55,0.35)]"
            >
              Book Your Date
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
