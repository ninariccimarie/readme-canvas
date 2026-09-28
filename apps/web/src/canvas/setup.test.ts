import { describe, expect, it } from "vitest";
import type { WidgetManifest, WidgetRegistry } from "@readme-canvas/core";
import {
  PROFILE_README_STEPS,
  collectSetupSteps,
} from "./setup";
import { addWidget, createInitialData, toggleSection } from "./state";

const Empty = () => null;
const schema = { parse: (value: unknown) => value } as WidgetManifest["schema"];

function statsWidget(): WidgetManifest {
  return {
    id: "github-stats",
    name: "GitHub Stats",
    category: "stats",
    description: "stats",
    defaultConfig: {},
    schema,
    Preview: Empty,
    Settings: Empty,
    generateMarkdown: () => "stats",
    setupInstructions: () => [
      { title: "GitHub Readme Stats", body: "Pin the public instance." },
    ],
  };
}

function registryOf(...manifests: WidgetManifest[]): WidgetRegistry {
  return new Map(manifests.map((manifest) => [manifest.id, manifest]));
}

describe("collectSetupSteps", () => {
  const about: WidgetManifest = {
    id: "about",
    name: "About",
    category: "profile",
    description: "about",
    defaultConfig: {},
    schema,
    Preview: Empty,
    Settings: Empty,
    generateMarkdown: () => "about",
  };
  const widgets = registryOf(about, statsWidget());

  it("always includes the profile README steps", () => {
    const steps = collectSetupSteps(createInitialData(widgets), widgets);

    expect(steps.slice(0, PROFILE_README_STEPS.length)).toEqual(
      PROFILE_README_STEPS,
    );
  });

  it("adds visible widget setup steps and skips disabled widgets", () => {
    let data = addWidget(createInitialData(widgets), "github-stats", widgets);
    const enabled = collectSetupSteps(data, widgets);

    expect(enabled.map((step) => step.title)).toContain("GitHub Readme Stats");

    const statsId = data.layout.sections[1]?.id ?? "";
    data = toggleSection(data, statsId);

    expect(
      collectSetupSteps(data, widgets).map((step) => step.title),
    ).not.toContain("GitHub Readme Stats");
  });
});
