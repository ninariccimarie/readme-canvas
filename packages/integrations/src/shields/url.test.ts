import { describe, expect, it } from "vitest";
import type { Theme } from "@readme-canvas/core";
import { integration } from "./index";
import { buildShieldUrl, shieldColorFromHex } from "./url";

const theme: Theme = {
  id: "github-light",
  name: "GitHub",
  family: "github",
  mode: "light",
  tokens: {
    primary: "#0969da",
    secondary: "#656d76",
    accent: "#1a7f37",
    background: "#ffffff",
    text: "#1f2328",
  },
};

describe("buildShieldUrl", () => {
  it("encodes label, logo, and color as query params", () => {
    const url = new URL(
      buildShieldUrl({
        label: "GitHub",
        message: "Follow",
        logo: "github",
        color: "#0969da",
      }),
    );

    expect(url.origin + url.pathname).toBe("https://img.shields.io/static/v1");
    expect(url.searchParams.get("label")).toBe("GitHub");
    expect(url.searchParams.get("message")).toBe("Follow");
    expect(url.searchParams.get("logo")).toBe("github");
    expect(url.searchParams.get("color")).toBe("0969da");
  });
});

describe("shields integration", () => {
  it("maps theme primary to a shields color", () => {
    expect(integration.resolveTheme?.(theme)).toBe(shieldColorFromHex("#0969da"));
  });
});
