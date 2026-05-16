import { createActor } from "@/backend";
import type { InquiryInput } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useSubmitInquiry() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: InquiryInput) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitInquiry(input);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}
