import { describe, expect, it } from "vitest";
import type { WidgetManifest, WidgetRegistry } from "@readme-canvas/core";
import {
  addWidget,
  composeDocumentMarkdown,
  createInitialData,
  createSection,
  moveSectionTo,
  removeSection,
  toggleSection,
  updateSectionConfig,
} from "./state";

const Empty = () => null;
const schema = { parse: (value: unknown) => value } as WidgetManifest["schema"];

function stub(
  id: string,
  markdown: string,
  extra?: Partial<WidgetManifest>,
): WidgetManifest {
  return {
    id,
    name: id,
    category: "content",
    description: id,
    defaultConfig: { text: markdown },
    schema,
    Preview: Empty,
    Settings: Empty,
    generateMarkdown: ({ section }) =>
      (section.config as { text: string }).text,
    ...extra,
  };
}

function registryOf(...manifests: WidgetManifest[]): WidgetRegistry {
  return new Map(manifests.map((manifest) => [manifest.id, manifest]));
}

describe("canvas state", () => {
  const about = stub("about", "# About");
  const socials = stub("socials", "socials");
  const widgets = registryOf(about, socials);

  it("starts with an About section", () => {
    const data = createInitialData(widgets);

    expect(data.layout.sections.map((section) => section.widgetId)).toEqual([
      "about",
    ]);
    expect(data.selectedSectionId).toBe(data.layout.sections[0]?.id);
    expect(data.familyId).toBe("github");
    expect(data.mode).toBe("light");
  });

  it("appends a widget and selects it", () => {
    const data = addWidget(createInitialData(widgets), "socials", widgets);

    expect(data.layout.sections.map((section) => section.widgetId)).toEqual([
      "about",
      "socials",
    ]);
    expect(data.selectedSectionId).toBe(data.layout.sections[1]?.id);
  });

  it("ignores unknown widget ids", () => {
    const initial = createInitialData(widgets);

    expect(addWidget(initial, "missing", widgets)).toBe(initial);
  });

  it("toggles enabled and omits disabled sections from markdown", () => {
    let data = createInitialData(widgets);
    const aboutId = data.layout.sections[0]?.id ?? "";
    data = toggleSection(data, aboutId);

    expect(data.layout.sections[0]?.enabled).toBe(false);
    expect(composeDocumentMarkdown(data, widgets)).toBe("");
  });

  it("moves a section using the layout engine", () => {
    let data = addWidget(createInitialData(widgets), "socials", widgets);
    const socialsId = data.layout.sections[1]?.id ?? "";
    data = moveSectionTo(data, socialsId, 0);

    expect(data.layout.sections.map((section) => section.widgetId)).toEqual([
      "socials",
      "about",
    ]);
  });

  it("removes the selected section and selects the first remaining", () => {
    let data = addWidget(createInitialData(widgets), "socials", widgets);
    const aboutId = data.layout.sections[0]?.id ?? "";
    data = removeSection(data, aboutId);

    expect(data.layout.sections.map((section) => section.widgetId)).toEqual([
      "socials",
    ]);
    expect(data.selectedSectionId).toBe(data.layout.sections[0]?.id);
  });

  it("updates section config used by composeMarkdown", () => {
    let data = createInitialData(widgets);
    const aboutId = data.layout.sections[0]?.id ?? "";
    data = updateSectionConfig(data, aboutId, { text: "# Hello" });

    expect(composeDocumentMarkdown(data, widgets)).toBe("# Hello");
  });

  it("returns null for an unknown section factory id", () => {
    expect(createSection("missing", widgets)).toBeNull();
  });
});
