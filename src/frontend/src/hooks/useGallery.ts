import { createActor } from "@/backend";
import type { GalleryImage } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useGalleryImages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<GalleryImage[]>({
    queryKey: ["gallery"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getGalleryImages();
    },
    enabled: !!actor && !isFetching,
  });
}
