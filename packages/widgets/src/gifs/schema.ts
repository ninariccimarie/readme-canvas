import { z } from "zod";

export const gifSchema = z.object({
  src: z.string(),
  alt: z.string(),
  href: z.string(),
  width: z.string(),
});

export type GifConfig = z.infer<typeof gifSchema>;

export const gifDefaultConfig: GifConfig = {
  src: "",
  alt: "GIF",
  href: "",
  width: "",
};
