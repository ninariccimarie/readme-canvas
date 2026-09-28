import { z } from "zod";

export const bannerSchema = z.object({
  imageUrl: z.string(),
  alt: z.string(),
  href: z.string(),
  width: z.string(),
});

export type BannerConfig = z.infer<typeof bannerSchema>;

export const bannerDefaultConfig: BannerConfig = {
  imageUrl: "",
  alt: "Banner",
  href: "",
  width: "100%",
};
