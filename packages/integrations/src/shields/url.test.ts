import { describe, expect, it } from "vitest";
import type { Theme } from "@readme-canvas/core";
import { integration } from "./index";
import {
  buildShieldUrl,
  buildStaticBadgeUrl,
  encodeShieldPathPart,
  shieldColorFromHex,
} from "./url";

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

describe("buildStaticBadgeUrl", () => {
  it("puts the message and color in the path and always sets style", () => {
    const url = new URL(
      buildStaticBadgeUrl({
        message: "TypeScript",
        color: "#007ACC",
        style: "flat",
        logo: "typescript",
      }),
    );

    expect(url.origin).toBe("https://img.shields.io");
    expect(url.pathname).toBe("/badge/TypeScript-007ACC");
    expect(url.searchParams.get("style")).toBe("flat");
    expect(url.searchParams.get("logo")).toBe("typescript");
    expect(url.searchParams.get("logoColor")).toBeNull();
    expect(url.searchParams.get("logoSize")).toBeNull();
    expect(url.searchParams.get("label")).toBeNull();
    expect(url.searchParams.get("labelColor")).toBeNull();
  });

  it("encodes spaces, dashes, and underscores in the path", () => {
    expect(encodeShieldPathPart("Node.js")).toBe("Node.js");
    expect(encodeShieldPathPart("C-sharp")).toBe("C--sharp");
    expect(encodeShieldPathPart("foo_bar")).toBe("foo__bar");
    expect(encodeShieldPathPart("Hello World")).toBe("Hello_World");

    const url = new URL(
      buildStaticBadgeUrl({
        message: "Hello World",
        color: "blue",
        style: "for-the-badge",
      }),
    );

    expect(url.pathname).toBe("/badge/Hello_World-blue");
    expect(url.searchParams.get("style")).toBe("for-the-badge");
  });

  it("passes named logoColor through and strips hex hashes", () => {
    const named = new URL(
      buildStaticBadgeUrl({
        message: "Rust",
        color: "black",
        style: "flat",
        logoColor: "white",
      }),
    );
    const hex = new URL(
      buildStaticBadgeUrl({
        message: "Rust",
        color: "#000000",
        style: "flat",
        logoColor: "#f5f5f5",
      }),
    );

    expect(named.searchParams.get("logoColor")).toBe("white");
    expect(hex.searchParams.get("logoColor")).toBe("f5f5f5");
    expect(hex.pathname).toBe("/badge/Rust-000000");
  });

  it("sets extra query params when they are non-empty", () => {
    const url = new URL(
      buildStaticBadgeUrl({
        message: "TypeScript",
        color: "007ACC",
        style: "plastic",
        logo: "typescript",
        logoSize: "auto",
        label: "lang",
        labelColor: "#111111",
      }),
    );

    expect(url.searchParams.get("style")).toBe("plastic");
    expect(url.searchParams.get("logoSize")).toBe("auto");
    expect(url.searchParams.get("label")).toBe("lang");
    expect(url.searchParams.get("labelColor")).toBe("111111");
  });
});

describe("shields integration", () => {
  it("maps theme primary to a shields color", () => {
    expect(integration.resolveTheme?.(theme)).toBe(shieldColorFromHex("#0969da"));
  });
});
