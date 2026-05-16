import type { FilmCategory } from "@/backend";

export type {
  Film,
  GalleryImage,
  Testimonial,
  Package,
  ContactInquiry,
  InquiryInput,
  FilmCategory,
} from "@/backend";

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export type FilmCategoryType = FilmCategory;
