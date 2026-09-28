import type { DisplayStyle, Skill } from "@readme-canvas/core";
import { z } from "zod";

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().nullable(),
  logo: z.string().nullable(),
  catalogId: z.string().nullable(),
});

export const skillsSchema = z.object({
  heading: z.string(),
  style: z.enum(["icons", "text", "badges"]),
  items: z.array(skillItemSchema),
});

export type SkillItem = z.infer<typeof skillItemSchema> & Skill;
export type SkillsConfig = {
  heading: string;
  style: DisplayStyle;
  items: SkillItem[];
};

export const skillsDefaultConfig: SkillsConfig = {
  heading: "Skills",
  style: "badges",
  items: [],
};
