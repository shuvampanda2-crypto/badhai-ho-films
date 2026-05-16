import { createActor } from "@/backend";
import type { Package } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

export function usePackages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Package[]>({
    queryKey: ["packages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPackages();
    },
    enabled: !!actor && !isFetching,
  });
}
