import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type FilmId = bigint;
export interface FilmInput {
    title: string;
    featured: boolean;
    thumbnailUrl: string;
    description: string;
    category: FilmCategory;
    youtubeUrl: string;
}
export interface PackageInput {
    features: Array<string>;
    name: string;
    highlighted: boolean;
    price: string;
}
export interface Film {
    id: FilmId;
    title: string;
    featured: boolean;
    thumbnailUrl: string;
    createdAt: bigint;
    description: string;
    category: FilmCategory;
    youtubeUrl: string;
}
export interface TestimonialInput {
    featured: boolean;
    name: string;
    quote: string;
    photoUrl: string;
    rating: bigint;
}
export interface Package {
    id: PackageId;
    features: Array<string>;
    name: string;
    highlighted: boolean;
    price: string;
}
export interface InquiryInput {
    name: string;
    email: string;
    message: string;
    phone: string;
    packageInterest: string;
    eventDate: string;
}
export type InquiryId = bigint;
export type GalleryImageId = bigint;
export interface GalleryImage {
    id: GalleryImageId;
    alt: string;
    url: string;
    displayOrder: bigint;
    createdAt: bigint;
    caption: string;
    category: string;
}
export type PackageId = bigint;
export interface ContactInquiry {
    id: InquiryId;
    name: string;
    createdAt: bigint;
    email: string;
    message: string;
    phone: string;
    packageInterest: string;
    eventDate: string;
}
export type TestimonialId = bigint;
export interface GalleryImageInput {
    alt: string;
    url: string;
    displayOrder: bigint;
    caption: string;
    category: string;
}
export interface Testimonial {
    id: TestimonialId;
    featured: boolean;
    name: string;
    createdAt: bigint;
    quote: string;
    photoUrl: string;
    rating: bigint;
}
export enum FilmCategory {
    coupleTeaser = "coupleTeaser",
    reel = "reel",
    weddingHighlights = "weddingHighlights",
    engagement = "engagement"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createFilm(input: FilmInput): Promise<Film>;
    createGalleryImage(input: GalleryImageInput): Promise<GalleryImage>;
    createPackage(input: PackageInput): Promise<Package>;
    createTestimonial(input: TestimonialInput): Promise<Testimonial>;
    deleteFilm(id: FilmId): Promise<void>;
    deleteGalleryImage(id: GalleryImageId): Promise<void>;
    deleteInquiry(id: InquiryId): Promise<void>;
    deletePackage(id: PackageId): Promise<void>;
    deleteTestimonial(id: TestimonialId): Promise<void>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedFilms(): Promise<Array<Film>>;
    getFeaturedTestimonials(): Promise<Array<Testimonial>>;
    getFilm(id: FilmId): Promise<Film | null>;
    getFilms(): Promise<Array<Film>>;
    getGalleryImages(): Promise<Array<GalleryImage>>;
    getGalleryImagesByCategory(category: string): Promise<Array<GalleryImage>>;
    getInquiries(): Promise<Array<ContactInquiry>>;
    getPackages(): Promise<Array<Package>>;
    getTestimonials(): Promise<Array<Testimonial>>;
    isCallerAdmin(): Promise<boolean>;
    submitInquiry(input: InquiryInput): Promise<ContactInquiry>;
    updateFilm(id: FilmId, input: FilmInput): Promise<boolean>;
    updateGalleryImage(id: GalleryImageId, input: GalleryImageInput): Promise<boolean>;
    updatePackage(id: PackageId, input: PackageInput): Promise<boolean>;
    updateTestimonial(id: TestimonialId, input: TestimonialInput): Promise<boolean>;
}
