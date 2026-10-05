import { SHIELD_BADGE_STYLES, type ShieldBadgeStyle } from "@readme-canvas/integrations";
import { z } from "zod";

export const shieldBadgeStyleSchema = z.enum(SHIELD_BADGE_STYLES);

export const socialItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  url: z.string(),
  platformId: z.string().nullable(),
  logo: z.string(),
  logoColor: z.string(),
  logoSize: z.string(),
  label: z.string(),
  labelColor: z.string(),
  color: z.string(),
  link: z.string(),
});

export const socialsSchema = z.object({
  heading: z.string(),
  style: shieldBadgeStyleSchema,
  items: z.array(socialItemSchema),
});

export type SocialItem = z.infer<typeof socialItemSchema>;
export type SocialsConfig = z.infer<typeof socialsSchema>;

export const socialItemBadgeDefaults = {
  logo: "",
  logoColor: "",
  logoSize: "",
  label: "",
  labelColor: "",
  color: "",
  link: "",
};

export const socialsDefaultConfig: SocialsConfig = {
  heading: "",
  style: "flat",
  items: [],
};

function normalizeStyle(style: unknown): ShieldBadgeStyle {
  const parsed = shieldBadgeStyleSchema.safeParse(style);
  return parsed.success ? parsed.data : "flat";
}

function normalizeItem(item: Partial<SocialItem> & { logo?: string | null }): SocialItem {
  return {
    id: item.id ?? "",
    name: item.name ?? "",
    url: item.url ?? "",
    platformId: item.platformId ?? null,
    logo: item.logo ?? "",
    logoColor: item.logoColor ?? "",
    logoSize: item.logoSize ?? "",
    label: item.label ?? "",
    labelColor: item.labelColor ?? "",
    color: item.color ?? "",
    link: item.link ?? "",
  };
}

export function normalizeSocialsConfig(
  config: Partial<SocialsConfig> & { items?: Array<Partial<SocialItem>> },
): SocialsConfig {
  return {
    heading: config.heading ?? socialsDefaultConfig.heading,
    style: normalizeStyle(config.style),
    items: (config.items ?? []).map(normalizeItem),
  };
}
