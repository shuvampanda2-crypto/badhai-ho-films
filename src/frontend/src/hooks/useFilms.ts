import { createActor } from "@/backend";
import type { Film } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function useFilms() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Film[]>({
    queryKey: ["films"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFilms();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFeaturedFilms() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Film[]>({
    queryKey: ["films", "featured"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeaturedFilms();
    },
    enabled: !!actor && !isFetching,
  });
}
