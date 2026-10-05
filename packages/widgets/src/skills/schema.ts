import { SHIELD_BADGE_STYLES, type ShieldBadgeStyle } from "@readme-canvas/integrations";
import { z } from "zod";

export const shieldBadgeStyleSchema = z.enum(SHIELD_BADGE_STYLES);

export const skillItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string().nullable(),
  catalogId: z.string().nullable(),
  logo: z.string(),
  logoColor: z.string(),
  logoSize: z.string(),
  label: z.string(),
  labelColor: z.string(),
  color: z.string(),
});

export const skillsSchema = z.object({
  heading: z.string(),
  style: shieldBadgeStyleSchema,
  items: z.array(skillItemSchema),
});

export type SkillItem = z.infer<typeof skillItemSchema>;
export type SkillsConfig = z.infer<typeof skillsSchema>;

export const skillItemBadgeDefaults = {
  logo: "",
  logoColor: "",
  logoSize: "",
  label: "",
  labelColor: "",
  color: "",
};

export const skillsDefaultConfig: SkillsConfig = {
  heading: "Skills",
  style: "flat",
  items: [],
};

function normalizeStyle(style: unknown): ShieldBadgeStyle {
  const parsed = shieldBadgeStyleSchema.safeParse(style);
  return parsed.success ? parsed.data : "flat";
}

function normalizeItem(item: Partial<SkillItem> & { logo?: string | null }): SkillItem {
  return {
    id: item.id ?? "",
    name: item.name ?? "",
    url: item.url ?? null,
    catalogId: item.catalogId ?? null,
    logo: item.logo ?? "",
    logoColor: item.logoColor ?? "",
    logoSize: item.logoSize ?? "",
    label: item.label ?? "",
    labelColor: item.labelColor ?? "",
    color: item.color ?? "",
  };
}

export function normalizeSkillsConfig(
  config: Partial<SkillsConfig> & { items?: Array<Partial<SkillItem>> },
): SkillsConfig {
  return {
    heading: config.heading ?? skillsDefaultConfig.heading,
    style: normalizeStyle(config.style),
    items: (config.items ?? []).map(normalizeItem),
  };
}
