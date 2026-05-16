import { createActor } from "@/backend";
import type { Testimonial } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedTestimonials() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}
