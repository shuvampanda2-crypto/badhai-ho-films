import { createActor } from "@/backend";
import type { FilmInput, GalleryImageInput, TestimonialInput } from "@/backend";
import type {
  ContactInquiry,
  Film,
  FilmCategory,
  GalleryImage,
  Testimonial,
} from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { AuthClient } from "@dfinity/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Film as FilmIcon,
  ImageIcon,
  LogIn,
  MessageSquare,
  Shield,
  Star,
  Trash2,
  UserX,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// ─── Auth helpers ───────────────────────────────────────────────────────────
const II_URL =
  process.env.NODE_ENV === "production"
    ? "https://identity.ic0.app"
    : "http://localhost:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai";

async function getAuthClient() {
  return AuthClient.create();
}

// ─── Inline hooks ────────────────────────────────────────────────────────────
function useAdminFilms() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Film[]>({
    queryKey: ["admin", "films"],
    queryFn: async () => (actor ? actor.getFilms() : []),
    enabled: !!actor && !isFetching,
  });
}
function useAdminGallery() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryImage[]>({
    queryKey: ["admin", "gallery"],
    queryFn: async () => (actor ? actor.getGalleryImages() : []),
    enabled: !!actor && !isFetching,
  });
}
function useAdminTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Testimonial[]>({
    queryKey: ["admin", "testimonials"],
    queryFn: async () => (actor ? actor.getTestimonials() : []),
    enabled: !!actor && !isFetching,
  });
}
function useAdminInquiries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<ContactInquiry[]>({
    queryKey: ["admin", "inquiries"],
    queryFn: async () => (actor ? actor.getInquiries() : []),
    enabled: !!actor && !isFetching,
  });
}

// ─── Category display helper ─────────────────────────────────────────────────
const FILM_CATEGORIES: { value: FilmCategory; label: string }[] = [
  { value: "weddingHighlights" as FilmCategory, label: "Wedding Highlights" },
  { value: "engagement" as FilmCategory, label: "Engagement" },
  { value: "coupleTeaser" as FilmCategory, label: "Couple Teaser" },
  { value: "reel" as FilmCategory, label: "Reel" },
];

const GALLERY_CATEGORIES = [
  "Wedding",
  "Engagement",
  "Pre-Wedding",
  "Birthday",
  "Candid",
  "Portrait",
  "Family",
];

function categoryLabel(cat: FilmCategory): string {
  return FILM_CATEGORIES.find((c) => c.value === cat)?.label ?? String(cat);
}

// ─── Shared sub-components ────────────────────────────────────────────────────
function GoldButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "md",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  variant?: "primary" | "danger" | "ghost";
  size?: "sm" | "md";
}) {
  const base =
    "inline-flex items-center justify-center font-body font-medium transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1",
    md: "px-5 py-2.5 text-sm gap-2",
  };
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/80 rounded",
    danger: "bg-[#B0B0B0] text-[#0F0F0F] hover:bg-[#B0B0B0]/80 rounded",
    ghost:
      "border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 rounded",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

function FormField({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
      >
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-[#B0B0B0]">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm bg-secondary border border-border rounded text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-smooth";

// ─── Films Tab ───────────────────────────────────────────────────────────────
function FilmsTab() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: films = [], isLoading } = useAdminFilms();

  const [form, setForm] = useState<FilmInput>({
    title: "",
    youtubeUrl: "",
    thumbnailUrl: "",
    description: "",
    category: "weddingHighlights" as FilmCategory,
    featured: false,
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof FilmInput, string>>
  >({});

  const createFilm = useMutation({
    mutationFn: async (input: FilmInput) => {
      if (!actor) throw new Error("Not ready");
      return actor.createFilm(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "films"] });
      qc.invalidateQueries({ queryKey: ["films"] });
      setForm({
        title: "",
        youtubeUrl: "",
        thumbnailUrl: "",
        description: "",
        category: "weddingHighlights" as FilmCategory,
        featured: false,
      });
      toast.success("Film added successfully");
    },
    onError: () => toast.error("Failed to add film"),
  });

  const deleteFilm = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not ready");
      return actor.deleteFilm(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "films"] });
      qc.invalidateQueries({ queryKey: ["films"] });
      toast.success("Film deleted");
    },
    onError: () => toast.error("Failed to delete film"),
  });

  function validate(): boolean {
    const e: Partial<Record<keyof FilmInput, string>> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.youtubeUrl.trim()) e.youtubeUrl = "YouTube URL is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="space-y-8">
      {/* Add Film Form */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display text-lg text-primary mb-5">Add New Film</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) createFilm.mutate(form);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormField label="Title" htmlFor="films-title" error={errors.title}>
            <input
              id="films-title"
              data-ocid="admin.films.title_input"
              className={inputCls}
              placeholder="Wedding Film Title"
              value={form.title}
              onChange={(e) =>
                setForm((p) => ({ ...p, title: e.target.value }))
              }
            />
          </FormField>
          <FormField
            label="YouTube URL"
            htmlFor="films-youtube"
            error={errors.youtubeUrl}
          >
            <input
              id="films-youtube"
              data-ocid="admin.films.youtube_input"
              className={inputCls}
              placeholder="https://youtube.com/watch?v=..."
              value={form.youtubeUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, youtubeUrl: e.target.value }))
              }
            />
          </FormField>
          <FormField label="Thumbnail URL" htmlFor="films-thumbnail">
            <input
              id="films-thumbnail"
              data-ocid="admin.films.thumbnail_input"
              className={inputCls}
              placeholder="https://img.youtube.com/..."
              value={form.thumbnailUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, thumbnailUrl: e.target.value }))
              }
            />
          </FormField>
          <FormField label="Category" htmlFor="films-category">
            <select
              id="films-category"
              data-ocid="admin.films.category_select"
              className={inputCls}
              value={form.category as string}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  category: e.target.value as FilmCategory,
                }))
              }
            >
              {FILM_CATEGORIES.map((c) => (
                <option key={c.value as string} value={c.value as string}>
                  {c.label}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Description" htmlFor="films-description">
            <textarea
              id="films-description"
              data-ocid="admin.films.description_textarea"
              className={`${inputCls} resize-none`}
              rows={2}
              placeholder="Short description…"
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />
          </FormField>
          <FormField label="Options">
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                data-ocid="admin.films.featured_checkbox"
                type="checkbox"
                className="accent-primary w-4 h-4"
                checked={form.featured}
                onChange={(e) =>
                  setForm((p) => ({ ...p, featured: e.target.checked }))
                }
              />
              <span className="text-sm text-muted-foreground">
                Mark as Featured
              </span>
            </label>
          </FormField>
          <div className="md:col-span-2 flex justify-end">
            <GoldButton
              type="submit"
              disabled={createFilm.isPending}
              data-ocid="admin.films.submit_button"
            >
              {createFilm.isPending ? "Adding…" : "Add Film"}
            </GoldButton>
          </div>
        </form>
      </div>

      {/* Films List */}
      <div className="space-y-3">
        <h3 className="font-display text-lg text-primary">
          All Films ({films.length})
        </h3>
        {isLoading ? (
          <div data-ocid="admin.films.loading_state" className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-secondary/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : films.length === 0 ? (
          <div
            data-ocid="admin.films.empty_state"
            className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg"
          >
            No films yet. Add one above.
          </div>
        ) : (
          <div className="space-y-2">
            {films.map((film, idx) => (
              <div
                key={film.id.toString()}
                data-ocid={`admin.films.item.${idx + 1}`}
                className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/40 transition-smooth"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {film.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {categoryLabel(film.category)}
                    {film.featured && (
                      <span className="ml-2 text-primary">★ Featured</span>
                    )}
                  </p>
                </div>
                <GoldButton
                  variant="danger"
                  size="sm"
                  onClick={() => deleteFilm.mutate(film.id)}
                  disabled={deleteFilm.isPending}
                  data-ocid={`admin.films.delete_button.${idx + 1}`}
                >
                  <Trash2 size={13} />
                  Delete
                </GoldButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Gallery Tab ─────────────────────────────────────────────────────────────
function GalleryTab() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: images = [], isLoading } = useAdminGallery();

  const [form, setForm] = useState<GalleryImageInput>({
    url: "",
    alt: "",
    caption: "",
    category: "Wedding",
    displayOrder: BigInt(0),
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof GalleryImageInput, string>>
  >({});

  const addImage = useMutation({
    mutationFn: async (input: GalleryImageInput) => {
      if (!actor) throw new Error("Not ready");
      return actor.createGalleryImage(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      setForm({
        url: "",
        alt: "",
        caption: "",
        category: "Wedding",
        displayOrder: BigInt(0),
      });
      toast.success("Image added");
    },
    onError: () => toast.error("Failed to add image"),
  });

  const deleteImage = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not ready");
      return actor.deleteGalleryImage(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "gallery"] });
      qc.invalidateQueries({ queryKey: ["gallery"] });
      toast.success("Image deleted");
    },
    onError: () => toast.error("Failed to delete image"),
  });

  function validate(): boolean {
    const e: Partial<Record<keyof GalleryImageInput, string>> = {};
    if (!form.url.trim()) e.url = "Image URL is required";
    if (!form.alt.trim()) e.alt = "Alt text is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display text-lg text-primary mb-5">
          Add Gallery Image
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) addImage.mutate(form);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormField label="Image URL" htmlFor="gallery-url" error={errors.url}>
            <input
              id="gallery-url"
              data-ocid="admin.gallery.url_input"
              className={inputCls}
              placeholder="https://..."
              value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
            />
          </FormField>
          <FormField label="Alt Text" htmlFor="gallery-alt" error={errors.alt}>
            <input
              id="gallery-alt"
              data-ocid="admin.gallery.alt_input"
              className={inputCls}
              placeholder="Describe the image"
              value={form.alt}
              onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
            />
          </FormField>
          <FormField label="Caption" htmlFor="gallery-caption">
            <input
              id="gallery-caption"
              data-ocid="admin.gallery.caption_input"
              className={inputCls}
              placeholder="Optional caption"
              value={form.caption}
              onChange={(e) =>
                setForm((p) => ({ ...p, caption: e.target.value }))
              }
            />
          </FormField>
          <FormField label="Category" htmlFor="gallery-category">
            <select
              id="gallery-category"
              data-ocid="admin.gallery.category_select"
              className={inputCls}
              value={form.category}
              onChange={(e) =>
                setForm((p) => ({ ...p, category: e.target.value }))
              }
            >
              {GALLERY_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>
          <div className="md:col-span-2 flex justify-end">
            <GoldButton type="submit" disabled={addImage.isPending}>
              {addImage.isPending ? "Adding…" : "Add Image"}
            </GoldButton>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-lg text-primary">
          All Images ({images.length})
        </h3>
        {isLoading ? (
          <div
            data-ocid="admin.gallery.loading_state"
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
          >
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-secondary/50 rounded animate-pulse"
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <div
            data-ocid="admin.gallery.empty_state"
            className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg"
          >
            No images yet. Add one above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {images.map((img, idx) => (
              <div
                key={img.id.toString()}
                data-ocid={`admin.gallery.item.${idx + 1}`}
                className="flex items-center gap-3 bg-card border border-border rounded-lg p-3 hover:border-primary/40 transition-smooth"
              >
                <div className="w-14 h-14 rounded overflow-hidden flex-shrink-0 bg-secondary">
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate">
                    {img.caption || img.alt}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {img.category}
                  </p>
                </div>
                <GoldButton
                  variant="danger"
                  size="sm"
                  onClick={() => deleteImage.mutate(img.id)}
                  disabled={deleteImage.isPending}
                  data-ocid={`admin.gallery.delete_button.${idx + 1}`}
                >
                  <Trash2 size={13} />
                </GoldButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Testimonials Tab ─────────────────────────────────────────────────────────
function TestimonialsTab() {
  const qc = useQueryClient();
  const { actor } = useActor(createActor);
  const { data: testimonials = [], isLoading } = useAdminTestimonials();

  const [form, setForm] = useState<TestimonialInput>({
    name: "",
    quote: "",
    rating: BigInt(5),
    photoUrl: "",
    featured: false,
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const addTestimonial = useMutation({
    mutationFn: async (input: TestimonialInput) => {
      if (!actor) throw new Error("Not ready");
      return actor.createTestimonial(input);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      qc.invalidateQueries({ queryKey: ["testimonials"] });
      setForm({
        name: "",
        quote: "",
        rating: BigInt(5),
        photoUrl: "",
        featured: false,
      });
      toast.success("Testimonial added");
    },
    onError: () => toast.error("Failed to add testimonial"),
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not ready");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin", "testimonials"] });
      qc.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial deleted");
    },
    onError: () => toast.error("Failed to delete testimonial"),
  });

  function validate(): boolean {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.quote.trim()) e.quote = "Quote is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="font-display text-lg text-primary mb-5">
          Add Testimonial
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validate()) addTestimonial.mutate(form);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <FormField
            label="Client Name"
            htmlFor="testimonials-name"
            error={errors.name}
          >
            <input
              id="testimonials-name"
              data-ocid="admin.testimonials.name_input"
              className={inputCls}
              placeholder="Priya & Rahul"
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            />
          </FormField>
          <FormField label="Rating" htmlFor="testimonials-rating">
            <select
              id="testimonials-rating"
              data-ocid="admin.testimonials.rating_select"
              className={inputCls}
              value={Number(form.rating)}
              onChange={(e) =>
                setForm((p) => ({ ...p, rating: BigInt(e.target.value) }))
              }
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>
                  {"★".repeat(r)} ({r}/5)
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Photo URL" htmlFor="testimonials-photo">
            <input
              id="testimonials-photo"
              data-ocid="admin.testimonials.photo_input"
              className={inputCls}
              placeholder="https://..."
              value={form.photoUrl}
              onChange={(e) =>
                setForm((p) => ({ ...p, photoUrl: e.target.value }))
              }
            />
          </FormField>
          <FormField label="Options">
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input
                data-ocid="admin.testimonials.featured_checkbox"
                type="checkbox"
                className="accent-primary w-4 h-4"
                checked={form.featured}
                onChange={(e) =>
                  setForm((p) => ({ ...p, featured: e.target.checked }))
                }
              />
              <span className="text-sm text-muted-foreground">
                Mark as Featured
              </span>
            </label>
          </FormField>
          <FormField
            label="Quote"
            htmlFor="testimonials-quote"
            error={errors.quote}
          >
            <textarea
              id="testimonials-quote"
              data-ocid="admin.testimonials.quote_textarea"
              className={`${inputCls} resize-none md:col-span-2`}
              rows={3}
              placeholder="Share their story…"
              value={form.quote}
              onChange={(e) =>
                setForm((p) => ({ ...p, quote: e.target.value }))
              }
            />
          </FormField>
          <div className="md:col-span-2 flex justify-end">
            <GoldButton type="submit" disabled={addTestimonial.isPending}>
              {addTestimonial.isPending ? "Adding…" : "Add Testimonial"}
            </GoldButton>
          </div>
        </form>
      </div>

      <div className="space-y-3">
        <h3 className="font-display text-lg text-primary">
          All Testimonials ({testimonials.length})
        </h3>
        {isLoading ? (
          <div
            data-ocid="admin.testimonials.loading_state"
            className="space-y-2"
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-16 bg-secondary/50 rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : testimonials.length === 0 ? (
          <div
            data-ocid="admin.testimonials.empty_state"
            className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg"
          >
            No testimonials yet. Add one above.
          </div>
        ) : (
          <div className="space-y-2">
            {testimonials.map((t, idx) => (
              <div
                key={t.id.toString()}
                data-ocid={`admin.testimonials.item.${idx + 1}`}
                className="flex items-center justify-between bg-card border border-border rounded-lg px-4 py-3 hover:border-primary/40 transition-smooth"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {"★".repeat(Number(t.rating))} · &ldquo;
                    {t.quote.slice(0, 60)}&hellip;&rdquo;
                  </p>
                </div>
                <GoldButton
                  variant="danger"
                  size="sm"
                  onClick={() => deleteTestimonial.mutate(t.id)}
                  disabled={deleteTestimonial.isPending}
                  data-ocid={`admin.testimonials.delete_button.${idx + 1}`}
                >
                  <Trash2 size={13} />
                </GoldButton>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Inquiries Tab ───────────────────────────────────────────────────────────
function InquiriesTab() {
  const { data: inquiries = [], isLoading } = useAdminInquiries();

  return (
    <div className="space-y-4">
      <h3 className="font-display text-lg text-primary">
        Contact Inquiries ({inquiries.length})
      </h3>
      {isLoading ? (
        <div data-ocid="admin.inquiries.loading_state" className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-secondary/50 rounded-lg animate-pulse"
            />
          ))}
        </div>
      ) : inquiries.length === 0 ? (
        <div
          data-ocid="admin.inquiries.empty_state"
          className="text-center py-16 text-muted-foreground border border-dashed border-border rounded-lg"
        >
          No inquiries received yet.
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map((inq, idx) => (
            <div
              key={inq.id.toString()}
              data-ocid={`admin.inquiries.item.${idx + 1}`}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-smooth"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-medium text-foreground">{inq.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {inq.email} · {inq.phone}
                  </p>
                </div>
                <div className="text-right">
                  {inq.packageInterest && (
                    <span className="inline-block px-2 py-0.5 text-xs border border-primary/40 text-primary rounded">
                      {inq.packageInterest}
                    </span>
                  )}
                  {inq.eventDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      📅 {inq.eventDate}
                    </p>
                  )}
                </div>
              </div>
              {inq.message && (
                <p className="text-sm text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                  {inq.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
type TabId = "films" | "gallery" | "testimonials" | "inquiries";

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "films", label: "Films", icon: <FilmIcon size={15} /> },
  { id: "gallery", label: "Gallery", icon: <ImageIcon size={15} /> },
  { id: "testimonials", label: "Testimonials", icon: <Star size={15} /> },
  { id: "inquiries", label: "Inquiries", icon: <MessageSquare size={15} /> },
];

export function Admin() {
  const [authState, setAuthState] = useState<
    "loading" | "unauthenticated" | "checking" | "denied" | "authorized"
  >("loading");
  const [activeTab, setActiveTab] = useState<TabId>("films");
  const { actor } = useActor(createActor);

  useEffect(() => {
    (async () => {
      const client = await getAuthClient();
      const isAuthenticated = await client.isAuthenticated();
      if (!isAuthenticated) {
        setAuthState("unauthenticated");
        return;
      }
      setAuthState("checking");
    })();
  }, []);

  // Once checking + actor ready, verify admin role
  useEffect(() => {
    if (authState !== "checking" || !actor) return;
    (async () => {
      try {
        const isAdmin = await actor.isCallerAdmin();
        setAuthState(isAdmin ? "authorized" : "denied");
      } catch {
        setAuthState("denied");
      }
    })();
  }, [authState, actor]);

  async function handleLogin() {
    const client = await getAuthClient();
    await new Promise<void>((resolve) =>
      client.login({
        identityProvider: II_URL,
        onSuccess: resolve,
      }),
    );
    setAuthState("checking");
  }

  async function handleLogout() {
    const client = await getAuthClient();
    await client.logout();
    setAuthState("unauthenticated");
  }

  // ── Loading state
  if (authState === "loading" || authState === "checking") {
    return (
      <div
        data-ocid="admin.loading_state"
        className="min-h-screen bg-background flex items-center justify-center"
      >
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Verifying access…</p>
        </div>
      </div>
    );
  }

  // ── Unauthenticated
  if (authState === "unauthenticated") {
    return (
      <div
        data-ocid="admin.login_page"
        className="min-h-screen bg-background flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full text-center space-y-8">
          <div className="space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto">
              <Shield size={28} className="text-primary" />
            </div>
            <h1 className="font-display text-3xl text-foreground">
              Admin Access
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This area is restricted to authorized team members only. Please
              authenticate with Internet Identity to continue.
            </p>
          </div>
          <button
            data-ocid="admin.login_button"
            type="button"
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/80 transition-smooth focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <LogIn size={18} />
            Sign in with Internet Identity
          </button>
          <p className="text-xs text-muted-foreground">
            Internet Identity is a secure, decentralized authentication system
            by DFINITY.
          </p>
        </div>
      </div>
    );
  }

  // ── Access denied
  if (authState === "denied") {
    return (
      <div
        data-ocid="admin.access_denied"
        className="min-h-screen bg-background flex items-center justify-center p-6"
      >
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#B0B0B0]/10 border border-[#B0B0B0]/30 flex items-center justify-center mx-auto">
            <UserX size={28} className="text-[#B0B0B0]" />
          </div>
          <div className="space-y-2">
            <h2 className="font-display text-2xl text-foreground">
              Access Denied
            </h2>
            <p className="text-muted-foreground text-sm">
              Your account does not have admin privileges. Contact the site
              owner to request access.
            </p>
          </div>
          <button
            data-ocid="admin.logout_button"
            type="button"
            onClick={handleLogout}
            className="px-6 py-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 rounded-lg text-sm transition-smooth"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // ── Authorized dashboard
  return (
    <div data-ocid="admin.page" className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={18} className="text-primary" />
            <span className="font-display text-lg text-foreground">
              Admin Dashboard
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground">
              · Badhai Ho
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="text-xs text-muted-foreground hover:text-primary transition-smooth"
            >
              ← View Site
            </a>
            <button
              data-ocid="admin.logout_button"
              type="button"
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 rounded transition-smooth"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Tab Nav */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-0 overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`admin.${tab.id}.tab`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-smooth whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "films" && <FilmsTab />}
        {activeTab === "gallery" && <GalleryTab />}
        {activeTab === "testimonials" && <TestimonialsTab />}
        {activeTab === "inquiries" && <InquiriesTab />}
      </main>
    </div>
  );
}
