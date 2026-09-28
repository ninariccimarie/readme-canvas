import { z } from "zod";

export const wakaTimeSchema = z.object({
  heading: z.string(),
  username: z.string(),
});

export type WakaTimeConfig = z.infer<typeof wakaTimeSchema>;

export const wakaTimeDefaultConfig: WakaTimeConfig = {
  heading: "WakaTime",
  username: "",
};
