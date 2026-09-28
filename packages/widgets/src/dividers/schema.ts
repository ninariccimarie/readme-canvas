import { z } from "zod";

export const dividerSchema = z.object({
  kind: z.enum(["line", "image"]),
  imageUrl: z.string(),
  alt: z.string(),
});

export type DividerConfig = z.infer<typeof dividerSchema>;

export const dividerDefaultConfig: DividerConfig = {
  kind: "line",
  imageUrl: "",
  alt: "",
};
