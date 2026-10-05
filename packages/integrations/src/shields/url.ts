export const SHIELD_BADGE_STYLES = [
  "flat",
  "flat-square",
  "plastic",
  "for-the-badge",
  "social",
] as const;

export type ShieldBadgeStyle = (typeof SHIELD_BADGE_STYLES)[number];

export interface ShieldBadgeParams {
  label: string;
  message?: string;
  color?: string;
  logo?: string | null;
  logoColor?: string;
  logoSize?: string;
  labelColor?: string;
  style?: ShieldBadgeStyle;
}

export interface StaticBadgeParams {
  message: string;
  color: string;
  style: ShieldBadgeStyle;
  logo?: string | null;
  logoColor?: string;
  logoSize?: string;
  label?: string;
  labelColor?: string;
  link?: string;
}

export function shieldColorFromHex(hex: string): string {
  return hex.replace(/^#/, "");
}

export function shieldColorParam(value: string): string {
  const trimmed = value.trim();
  return trimmed.startsWith("#") ? shieldColorFromHex(trimmed) : trimmed;
}

export function encodeShieldPathPart(value: string): string {
  return value.replaceAll("_", "__").replaceAll("-", "--").replaceAll(" ", "_");
}

function setOptionalQuery(
  url: URL,
  key: string,
  value: string | null | undefined,
  asColor = false,
) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return;
  }

  url.searchParams.set(key, asColor ? shieldColorParam(trimmed) : trimmed);
}

export function buildShieldUrl(params: ShieldBadgeParams): string {
  const url = new URL("https://img.shields.io/static/v1");
  url.searchParams.set("label", params.label);
  url.searchParams.set("message", params.message ?? "");

  if (params.color) {
    url.searchParams.set("color", shieldColorFromHex(params.color));
  }

  if (params.logo) {
    url.searchParams.set("logo", params.logo);
  }

  if (params.logoColor) {
    url.searchParams.set("logoColor", shieldColorFromHex(params.logoColor));
  }

  return url.toString();
}

export function buildShieldMarkdown(params: ShieldBadgeParams): string {
  return `![${params.label}](${buildShieldUrl(params)})`;
}

export function buildStaticBadgeUrl(params: StaticBadgeParams): string {
  const message = encodeShieldPathPart(params.message);
  const color = encodeShieldPathPart(shieldColorParam(params.color));
  const url = new URL(`https://img.shields.io/badge/${message}-${color}`);

  url.searchParams.set("style", params.style);
  setOptionalQuery(url, "logo", params.logo);
  setOptionalQuery(url, "logoColor", params.logoColor, true);
  setOptionalQuery(url, "logoSize", params.logoSize);
  setOptionalQuery(url, "label", params.label);
  setOptionalQuery(url, "labelColor", params.labelColor, true);
  setOptionalQuery(url, "link", params.link);

  return url.toString();
}

export function buildStaticBadgeMarkdown(
  params: StaticBadgeParams,
  alt = params.message,
): string {
  return `![${alt}](${buildStaticBadgeUrl(params)})`;
}
