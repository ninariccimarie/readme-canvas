const HEX_COLOR = /^#?[0-9a-fA-F]{6}$/;

export function hexForColorInput(value: string, fallback = "#000000"): string {
  const trimmed = value.trim();
  const withHash = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;

  return HEX_COLOR.test(withHash) ? withHash.toLowerCase() : fallback;
}
