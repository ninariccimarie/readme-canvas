import type { ShieldBadgeStyle, StaticBadgeParams } from "@readme-canvas/integrations";
import type { SkillItem } from "./schema";

export function staticBadgeParamsFromSkill(
  item: SkillItem,
  style: ShieldBadgeStyle,
  fallbackColor: string,
): StaticBadgeParams | null {
  const name = item.name.trim();

  if (!name) {
    return null;
  }

  return {
    message: name,
    color: item.color.trim() || fallbackColor,
    style,
    logo: item.logo.trim() || undefined,
    logoColor: item.logoColor.trim() || undefined,
    logoSize: item.logoSize.trim() || undefined,
    label: item.label.trim() || undefined,
    labelColor: item.labelColor.trim() || undefined,
    link: item.link.trim() || undefined,
  };
}
