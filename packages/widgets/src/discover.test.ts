import { describe, expect, it } from "vitest";
import { discoverWidgets } from "./discover";

describe("discoverWidgets", () => {
  it("returns widget manifests discovered by glob", () => {
    const widgets = discoverWidgets();

    expect(Array.isArray(widgets)).toBe(true);
    expect(widgets.every((widget) => typeof widget.id === "string")).toBe(true);
    expect(widgets.every((widget) => typeof widget.generateMarkdown === "function")).toBe(
      true,
    );
  });
});
