import type { DisplayStyle, Social } from "@readme-canvas/core";
import { z } from "zod";

export const socialItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  logo: z.string().nullable(),
  platformId: z.string().nullable(),
});

export const socialsSchema = z.object({
  heading: z.string(),
  style: z.enum(["icons", "text", "badges"]),
  items: z.array(socialItemSchema),
});

export type SocialItem = z.infer<typeof socialItemSchema> & Social;
export type SocialsConfig = {
  heading: string;
  style: DisplayStyle;
  items: SocialItem[];
};

export const socialsDefaultConfig: SocialsConfig = {
  heading: "",
  style: "icons",
  items: [],
};
