import { Layout } from "@/components/Layout";
import { useGalleryImages } from "@/hooks/useGallery";
import type { GalleryImage } from "@/types";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

type HeightClass = "h-48" | "h-64" | "h-80" | "h-96";

type SampleItem = {
  id: bigint;
  coupleName: string;
  category: string;
  gradient: string;
  heightClass: HeightClass;
  caption: string;
  imageUrl?: string;
};

const SAMPLE_ITEMS: SampleItem[] = [
  {
    id: 1n,
    coupleName: "Priya & Arjun",
    category: "Weddings",
    gradient: "from-amber-900/60 via-stone-800 to-zinc-900",
    heightClass: "h-80",
    caption: "Sacred vows at sunrise",
    imageUrl: "/assets/images/wedding1.jpg",
  },
  {
    id: 2n,
    coupleName: "Meera & Rohan",
    category: "Engagements",
    gradient: "from-neutral-500/40 via-stone-900 to-zinc-900",
    heightClass: "h-48",
    caption: "The moment of yes",
    imageUrl: "/assets/images/wedding2.jpg",
  },
  {
    id: 3n,
    coupleName: "Sneha & Vikram",
    category: "Pre-Wedding",
    gradient: "from-yellow-900/40 via-stone-800 to-neutral-900",
    heightClass: "h-96",
    caption: "Golden hour together",
    imageUrl: "/assets/images/wedding3.jpg",
  },
  {
    id: 4n,
    coupleName: "Kavya & Nikhil",
    category: "Weddings",
    gradient: "from-orange-900/50 via-zinc-900 to-stone-900",
    heightClass: "h-64",
    caption: "Together forever",
    imageUrl: "/assets/images/wedding4.jpg",
  },
  {
    id: 5n,
    coupleName: "Ananya & Dev",
    category: "Events",
    gradient: "from-amber-800/50 via-neutral-900 to-zinc-900",
    heightClass: "h-48",
    caption: "Birthday celebration",
    imageUrl: "/assets/images/wedding5.jpg",
  },
  {
    id: 6n,
    coupleName: "Riya & Karan",
    category: "Engagements",
    gradient: "from-neutral-500/40 via-stone-900 to-zinc-900",
    heightClass: "h-80",
    caption: "A promise of forever",
    imageUrl: "/assets/images/wedding6.jpg",
  },
  {
    id: 7n,
    coupleName: "Pooja & Rahul",
    category: "Weddings",
    gradient: "from-yellow-900/50 via-stone-800 to-neutral-900",
    heightClass: "h-64",
    caption: "Pheras under the stars",
    imageUrl: "/assets/images/wedding7.jpg",
  },
  {
    id: 8n,
    coupleName: "Divya & Siddharth",
    category: "Pre-Wedding",
    gradient: "from-amber-900/60 via-zinc-900 to-stone-900",
    heightClass: "h-96",
    caption: "Love in every frame",
    imageUrl: "/assets/images/wedding8.jpg",
  },
  {
    id: 9n,
    coupleName: "Anjali & Aditya",
    category: "Weddings",
    gradient: "from-stone-700/60 via-zinc-900 to-neutral-900",
    heightClass: "h-48",
    caption: "Mandap magic",
    imageUrl: "/assets/images/wedding9.jpg",
  },
  {
    id: 10n,
    coupleName: "Nisha & Aarav",
    category: "Events",
    gradient: "from-orange-900/50 via-stone-900 to-zinc-900",
    heightClass: "h-80",
    caption: "Thread ceremony bliss",
    imageUrl: "/assets/images/wedding10.jpg",
  },
  {
    id: 11n,
    coupleName: "Tanvi & Mihir",
    category: "Engagements",
    gradient: "from-neutral-500/40 via-neutral-900 to-stone-900",
    heightClass: "h-64",
    caption: "Rings & roses",
    imageUrl: "/assets/images/wedding11.jpg",
  },
  {
    id: 12n,
    coupleName: "Swati & Pratik",
    category: "Pre-Wedding",
    gradient: "from-yellow-800/50 via-zinc-900 to-stone-900",
    heightClass: "h-48",
    caption: "Candid & carefree",
    imageUrl: "/assets/images/wedding12.jpg",
  },
  {
    id: 13n,
    coupleName: "Isha & Gaurav",
    category: "Weddings",
    gradient: "from-amber-700/40 via-stone-800 to-neutral-900",
    heightClass: "h-96",
    caption: "Baraat celebrations",
    imageUrl: "/assets/images/wedding13.jpg",
  },
  {
    id: 14n,
    coupleName: "Ritika & Sameer",
    category: "Events",
    gradient: "from-orange-800/50 via-neutral-900 to-zinc-900",
    heightClass: "h-64",
    caption: "Birthday milestone",
    imageUrl: "/assets/images/wedding14.jpg",
  },
  {
    id: 15n,
    coupleName: "Bhavna & Yash",
    category: "Engagements",
    gradient: "from-neutral-500/40 via-stone-900 to-zinc-900",
    heightClass: "h-80",
    caption: "Sealed with a ring",
    imageUrl: "/assets/images/wedding15.jpg",
  },
  {
    id: 16n,
    coupleName: "Lata & Rohit",
    category: "Pre-Wedding",
    gradient: "from-amber-900/50 via-zinc-800 to-neutral-900",
    heightClass: "h-48",
    caption: "Sunset silhouettes",
    imageUrl: "/assets/images/wedding16.jpg",
  },
];

const CATEGORIES = ["All", "Weddings", "Engagements", "Pre-Wedding", "Events"];

function toSampleItem(img: GalleryImage, index: number): SampleItem {
  const heights: HeightClass[] = ["h-48", "h-64", "h-80", "h-96"];
  return {
    id: img.id,
    coupleName: img.alt,
    category: img.category.charAt(0).toUpperCase() + img.category.slice(1),
    gradient: SAMPLE_ITEMS[index % SAMPLE_ITEMS.length].gradient,
    heightClass: heights[index % heights.length],
    caption: img.caption,
    imageUrl: SAMPLE_ITEMS[index % SAMPLE_ITEMS.length].imageUrl,
  };
}

export function Gallery() {
  const { data: galleryData } = useGalleryImages();
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items: SampleItem[] =
    galleryData && galleryData.length > 0
      ? galleryData.map(toSampleItem)
      : SAMPLE_ITEMS;

  const filtered =
    activeFilter === "All"
      ? items
      : items.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + filtered.length) % filtered.length : null,
      ),
    [filtered.length],
  );
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null)),
    [filtered.length],
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  const lightboxItem = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <Layout>
      {/* Hero Header */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="font-body text-xs text-[#D4AF37] tracking-[0.35em] uppercase mb-4">
              Visual Stories
            </p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Our Gallery
            </h1>
            <p className="text-muted-foreground font-body text-base leading-relaxed">
              A curated collection of emotional, candid, and cinematic moments —
              each frame a lifetime of memories.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="glass-strong border-b border-white/10 sticky top-[72px] z-30">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center justify-center gap-2 md:gap-3 py-4 flex-wrap"
            data-ocid="gallery.filter_tabs"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`gallery.filter.${cat.toLowerCase().replace("-", "_")}`}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-5 py-2 rounded-full font-body text-xs tracking-[0.2em] uppercase transition-smooth border ${
                  activeFilter === cat
                    ? "bg-[#D4AF37] text-[#0F0F0F] border-[#D4AF37] font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                    : "glass border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="bg-background py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-32"
              data-ocid="gallery.empty_state"
            >
              <p className="font-display text-3xl text-muted-foreground mb-4">
                No images yet
              </p>
              <p className="font-body text-sm text-muted-foreground/60">
                Check back soon for beautiful moments.
              </p>
            </motion.div>
          ) : (
            <div
              className="columns-1 sm:columns-2 lg:columns-3 gap-3"
              data-ocid="gallery.grid"
            >
              {filtered.map((item, i) => (
                <motion.div
                  key={item.id.toString()}
                  initial={{ opacity: 0, scale: 0.94 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    delay: (i % 6) * 0.07,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  data-ocid={`gallery.item.${i + 1}`}
                  className="gallery-item"
                  onClick={() => openLightbox(i)}
                >
                  {/* Real photo or gradient fallback */}
                  <div
                    className={`w-full ${item.heightClass} bg-gradient-to-br ${item.gradient} relative overflow-hidden`}
                  >
                    {item.imageUrl && (
                      <img
                        src={item.imageUrl}
                        alt={item.coupleName}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    )}
                  </div>

                  {/* Pinterest-style hover overlay */}
                  <div className="gallery-overlay" />

                  {/* Gold bracket accents */}
                  <div className="gallery-bracket-tl" />
                  <div className="gallery-bracket-br" />

                  {/* Slide-up info bar */}
                  <div className="gallery-info">
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-display text-sm text-white font-semibold leading-tight truncate">
                          {item.coupleName}
                        </p>
                        <p className="font-body text-xs text-white/70 mt-0.5 truncate">
                          {item.caption}
                        </p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-body tracking-widest uppercase bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem !== null && lightboxIndex !== null && (
          <dialog
            open
            className="fixed inset-0 z-50 w-full h-full max-w-full max-h-full m-0 p-0 bg-transparent border-none outline-none"
            data-ocid="gallery.dialog"
            aria-modal="true"
            aria-label={`Gallery lightbox: ${lightboxItem.coupleName}`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 bg-black/85 backdrop-blur-xl flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close */}
              <button
                type="button"
                onClick={closeLightbox}
                data-ocid="gallery.close_button"
                aria-label="Close lightbox"
                className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-smooth rounded-full glass border-white/15 hover:border-[#D4AF37]/60"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Prev */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                data-ocid="gallery.pagination_prev"
                aria-label="Previous image"
                className="absolute left-4 md:left-8 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-smooth rounded-full glass border-white/15 hover:border-[#D4AF37]/60"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                data-ocid="gallery.pagination_next"
                aria-label="Next image"
                className="absolute right-4 md:right-8 z-10 w-12 h-12 flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-smooth rounded-full glass border-white/15 hover:border-[#D4AF37]/60"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Content */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-3xl w-full mx-auto px-16 md:px-20 glass-card rounded-2xl p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
              >
                {/* Lightbox image */}
                <div
                  className={`w-full h-[50vh] max-h-[480px] bg-gradient-to-br ${lightboxItem.gradient} overflow-hidden relative rounded-xl`}
                >
                  {lightboxItem.imageUrl && (
                    <img
                      src={lightboxItem.imageUrl}
                      alt={lightboxItem.coupleName}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {/* Gold frame accent */}
                  <div className="absolute inset-2 border border-[#D4AF37]/20 pointer-events-none" />
                </div>

                {/* Caption */}
                <div className="mt-5 text-center">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                    {lightboxItem.coupleName}
                  </h2>
                  <p className="font-body text-sm text-muted-foreground mt-1">
                    {lightboxItem.caption}
                  </p>
                  <p className="font-body text-xs text-[#D4AF37] tracking-[0.2em] uppercase mt-2">
                    {lightboxItem.category}
                  </p>
                </div>

                {/* Counter */}
                <p className="mt-3 text-center font-body text-xs text-muted-foreground/60">
                  {lightboxIndex + 1} / {filtered.length}
                </p>
              </motion.div>
            </motion.div>
          </dialog>
        )}
      </AnimatePresence>
    </Layout>
  );
}
