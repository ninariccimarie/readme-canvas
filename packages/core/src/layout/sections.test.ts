import { describe, expect, it } from "vitest";
import { moveSection, visibleSections } from "./sections";
import type { Layout } from "../domain/section";

function layout(
  ...sections: Array<{ id: string; enabled?: boolean; widgetId?: string }>
): Layout {
  return {
    version: 1,
    sections: sections.map((section) => ({
      id: section.id,
      widgetId: section.widgetId ?? section.id,
      enabled: section.enabled ?? true,
      config: {},
    })),
  };
}

describe("visibleSections", () => {
  it("returns enabled sections in original order", () => {
    const result = visibleSections(
      layout(
        { id: "a" },
        { id: "b", enabled: false },
        { id: "c" },
      ),
    );

    expect(result.map((section) => section.id)).toEqual(["a", "c"]);
  });

  it("returns an empty list when every section is disabled", () => {
    expect(
      visibleSections(layout({ id: "a", enabled: false })),
    ).toEqual([]);
  });
});

describe("moveSection", () => {
  it("reorders a section to the given index", () => {
    const moved = moveSection(layout({ id: "a" }, { id: "b" }, { id: "c" }), "c", 0);

    expect(moved.sections.map((section) => section.id)).toEqual(["c", "a", "b"]);
  });

  it("is a no-op when the section id is missing", () => {
    const original = layout({ id: "a" }, { id: "b" });

    expect(moveSection(original, "missing", 0)).toBe(original);
  });
});
