import { FilmCategory } from "@/backend";
import { Layout } from "@/components/Layout";
import { useFilms } from "@/hooks/useFilms";
import type { Film } from "@/types";
import { Film as FilmIcon, Play, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  all: "All",
  [FilmCategory.engagement]: "Engagement Films",
  [FilmCategory.weddingHighlights]: "Wedding Highlights",
  [FilmCategory.coupleTeaser]: "Couple Teasers",
  [FilmCategory.reel]: "Reels",
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  [FilmCategory.engagement]:
    "bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/30",
  [FilmCategory.weddingHighlights]:
    "bg-secondary text-foreground border-border",
  [FilmCategory.coupleTeaser]:
    "bg-[#D4AF37]/10 text-[#D4AF37]/90 border-[#D4AF37]/20",
  [FilmCategory.reel]: "bg-muted text-muted-foreground border-border",
};

const SAMPLE_FILMS: Film[] = [
  {
    id: 1n,
    title: "Rahul & Priya — Wedding Highlights",
    description:
      "A grand celebration of love, tradition, and joyful togetherness across two families.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    category: FilmCategory.weddingHighlights,
    createdAt: 0n,
  },
  {
    id: 2n,
    title: "Arjun & Sneha — Engagement Film",
    description:
      "Their eyes met and the world stood still. A timeless engagement story.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    category: FilmCategory.engagement,
    createdAt: 0n,
  },
  {
    id: 3n,
    title: "Vikram & Kavya — Couple Teaser",
    description:
      "Golden hour, whispered vows, and a love that lights up every frame.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    category: FilmCategory.coupleTeaser,
    createdAt: 0n,
  },
  {
    id: 4n,
    title: "Dev & Pooja — Wedding Reel",
    description:
      "60 seconds of pure magic — their wedding distilled into one unforgettable reel.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.reel,
    createdAt: 0n,
  },
  {
    id: 5n,
    title: "Suresh & Meena — Wedding Highlights",
    description:
      "Traditional Odia rituals, vibrant colours, and cinematic storytelling.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.weddingHighlights,
    createdAt: 0n,
  },
  {
    id: 6n,
    title: "Rohan & Nisha — Engagement Film",
    description:
      "From nervous smiles to heartfelt laughter — a genuine love story captured beautifully.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.engagement,
    createdAt: 0n,
  },
  {
    id: 7n,
    title: "Aakash & Divya — Couple Teaser",
    description:
      "Beach sand, ocean breeze, and two souls meant to be together forever.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.coupleTeaser,
    createdAt: 0n,
  },
  {
    id: 8n,
    title: "Karan & Anjali — Wedding Reel",
    description:
      "High energy, slow moments, raw emotions — all in under a minute.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.reel,
    createdAt: 0n,
  },
  {
    id: 9n,
    title: "Nikhil & Swati — Wedding Highlights",
    description:
      "Four hundred guests, one unforgettable cinematic story of eternal love.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: true,
    category: FilmCategory.weddingHighlights,
    createdAt: 0n,
  },
  {
    id: 10n,
    title: "Saurabh & Isha — Engagement Film",
    description:
      "A rooftop engagement beneath city lights — magical, modern, and deeply personal.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.engagement,
    createdAt: 0n,
  },
  {
    id: 11n,
    title: "Tarun & Preethi — Couple Teaser",
    description:
      "Candid, warm, and full of laughter — exactly how love should feel.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.coupleTeaser,
    createdAt: 0n,
  },
  {
    id: 12n,
    title: "Manish & Rekha — Social Reel",
    description:
      "Trending sounds meet timeless moments in this viral-worthy wedding reel.",
    thumbnailUrl: "/assets/generated/hero-wedding.dim_1920x1080.jpg",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    featured: false,
    category: FilmCategory.reel,
    createdAt: 0n,
  },
];

const FILTERS = ["all", ...Object.values(FilmCategory)];

function getYoutubeId(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([-\w]{11})/);
  return match ? match[1] : null;
}

function getCategoryBadge(category: FilmCategory): string {
  return (
    CATEGORY_BADGE_COLORS[category] ??
    "bg-muted text-muted-foreground border-border"
  );
}

export function Films() {
  const { data: filmsData } = useFilms();
  const [activeFilter, setActiveFilter] = useState("all");
  const [playingFilm, setPlayingFilm] = useState<Film | null>(null);

  const films = filmsData && filmsData.length > 0 ? filmsData : SAMPLE_FILMS;
  const filtered =
    activeFilter === "all"
      ? films
      : films.filter((f) => f.category === activeFilter);

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 bg-card/30 border-b border-white/8 overflow-hidden">
        {/* decorative gold line */}
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

      {/* Films Content */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Category Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-14"
            data-ocid="films.filter_tabs"
          >
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                data-ocid={`films.filter.${f}`}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 font-body text-xs tracking-widest uppercase transition-smooth border ${
                  activeFilter === f
                    ? "bg-[#D4AF37] text-[#0F0F0F] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.25)]"
                    : "border-border text-muted-foreground hover:border-[#D4AF37]/60 hover:text-foreground"
                }`}
              >
                {CATEGORY_LABELS[f]}
              </button>
            ))}
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-24 text-center"
                data-ocid="films.empty_state"
              >
                <FilmIcon
                  className="h-12 w-12 text-[#D4AF37]/40 mb-5"
                  strokeWidth={1.2}
                />
                <p className="font-display text-2xl text-foreground/50 mb-2">
                  No films in this category yet
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  We&apos;re adding new films every week — check back soon.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
                data-ocid="films.grid"
              >
                {filtered.map((film, i) => (
                  <FilmCard
                    key={film.id.toString()}
                    film={film}
                    index={i}
                    onPlay={() => setPlayingFilm(film)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {playingFilm && (
          <VideoModal film={playingFilm} onClose={() => setPlayingFilm(null)} />
        )}
      </AnimatePresence>
    </Layout>
  );
}

/* ─── Film Card ─────────────────────────────────────────────────────────────── */

interface FilmCardProps {
  film: Film;
  index: number;
  onPlay: () => void;
}

function FilmCard({ film, index, onPlay }: FilmCardProps) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      data-ocid={`films.item.${index + 1}`}
      className="group relative overflow-hidden bg-card aspect-video cursor-pointer w-full text-left"
      onClick={onPlay}
      aria-label={`Play ${film.title}`}
    >
      {/* Thumbnail */}
      <img
        src={
          film.thumbnailUrl ||
          "/assets/generated/hero-wedding.dim_1920x1080.jpg"
        }
        alt={film.title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-107"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-background/0 group-hover:bg-background/15 transition-smooth" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full border-2 border-[#D4AF37]/70 flex items-center justify-center bg-background/20 backdrop-blur-sm group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 transition-smooth"
        >
          <Play className="h-5 w-5 text-[#D4AF37] ml-0.5" fill="currentColor" />
        </motion.div>
      </div>

      {/* Card footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Category badge */}
        <span
          className={`inline-block px-2.5 py-0.5 text-[10px] font-body tracking-widest uppercase border rounded-sm mb-2 ${getCategoryBadge(film.category)}`}
        >
          {CATEGORY_LABELS[film.category]}
        </span>
        <p className="font-display text-base font-bold text-foreground leading-snug truncate">
          {film.title}
        </p>
      </div>
    </motion.button>
  );
}

/* ─── Video Modal ────────────────────────────────────────────────────────────── */

interface VideoModalProps {
  film: Film;
  onClose: () => void;
}

function VideoModal({ film, onClose }: VideoModalProps) {
  const youtubeId = getYoutubeId(film.youtubeUrl);

  return (
    <motion.div
      key="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="presentation"
    >
      <motion.dialog
        key="modal-content"
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl glass-card rounded-2xl p-0 m-0 border-0"
        data-ocid="films.video_dialog"
        aria-modal="true"
        aria-label={film.title}
        open
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (e.key === "Escape") onClose();
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          data-ocid="films.video_close_button"
          aria-label="Close video"
          className="absolute -top-11 right-0 text-muted-foreground hover:text-[#D4AF37] transition-smooth flex items-center gap-1.5 font-body text-xs tracking-widest uppercase"
        >
          <X className="h-4 w-4" />
          Close
        </button>

        {/* Video embed */}
        <div className="aspect-video overflow-hidden rounded-t-2xl">
          {youtubeId ? (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={film.title}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground font-body text-sm">
                Video unavailable
              </p>
            </div>
          )}
        </div>

        {/* Film info */}
        <div className="mt-4 flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <p className="font-display text-xl font-bold text-foreground leading-snug">
              {film.title}
            </p>
            <p className="text-sm text-muted-foreground mt-1 font-body leading-relaxed line-clamp-2">
              {film.description}
            </p>
          </div>
          <span
            className={`shrink-0 mt-0.5 inline-block px-2.5 py-0.5 text-[10px] font-body tracking-widest uppercase border rounded-sm ${getCategoryBadge(film.category)}`}
          >
            {CATEGORY_LABELS[film.category]}
          </span>
        </div>
      </motion.dialog>
    </motion.div>
  );
}
