import {
  visibleSections,
  type SetupStep,
  type WidgetGenerateContext,
  type WidgetRegistry,
} from "@readme-canvas/core";
import type { CanvasDocument } from "./state";
import { currentTheme } from "./theme";

export const PROFILE_README_STEPS: SetupStep[] = [
  {
    title: "Create the profile repository",
    body: "Create a GitHub repository with the same name as your username.",
  },
  {
    title: "Add README.md",
    body: "Create a README.md file in that repository.",
  },
  {
    title: "Paste the Markdown",
    body: "Paste the generated Markdown into README.md, then commit and push.",
  },
];

export function collectSetupSteps(
  data: CanvasDocument,
  widgets: WidgetRegistry,
): SetupStep[] {
  const theme = currentTheme(data.familyId, data.mode);
  const steps = [...PROFILE_README_STEPS];
  const seen = new Set(steps.map((step) => step.title));

  for (const section of visibleSections(data.layout)) {
    const widget = widgets.get(section.widgetId);
    const extra =
      widget?.setupInstructions?.({
        section,
        profile: data.profile,
        theme,
      } satisfies WidgetGenerateContext) ?? [];

    for (const step of extra) {
      if (!seen.has(step.title)) {
        seen.add(step.title);
        steps.push(step);
      }
    }
  }

  return steps;
}
