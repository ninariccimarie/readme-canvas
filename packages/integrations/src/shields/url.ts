export interface ShieldBadgeParams {
  label: string;
  message?: string;
  color?: string;
  logo?: string | null;
  logoColor?: string;
}

export function shieldColorFromHex(hex: string): string {
  return hex.replace(/^#/, "");
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
