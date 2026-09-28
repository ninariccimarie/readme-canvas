import { z } from "zod";

export const aboutSchema = z.object({
  showAvatar: z.boolean(),
  headline: z.string(),
  body: z.string(),
});

export type AboutConfig = z.infer<typeof aboutSchema>;

export const aboutDefaultConfig: AboutConfig = {
  showAvatar: true,
  headline: "",
  body: "",
};
