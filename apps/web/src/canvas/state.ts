import {
  composeMarkdown,
  moveSection as moveSectionInLayout,
  type ColorMode,
  type Layout,
  type Profile,
  type Section,
  type WidgetRegistry,
} from "@readme-canvas/core";
import { currentTheme } from "./theme";

export type ImportStatus = "idle" | "loading" | "success" | "error";

export interface CanvasDocument {
  profile: Profile | null;
  familyId: string;
  mode: ColorMode;
  layout: Layout;
}

export interface CanvasData extends CanvasDocument {
  usernameInput: string;
  status: ImportStatus;
  errorMessage: string | null;
  selectedSectionId: string | null;
}

export function createSection(
  widgetId: string,
  widgets: WidgetRegistry,
  id = crypto.randomUUID(),
): Section | null {
  const widget = widgets.get(widgetId);

  if (!widget) {
    return null;
  }

  return {
    id,
    widgetId,
    enabled: true,
    config: structuredClone(widget.defaultConfig),
  };
}

export function createInitialData(widgets: WidgetRegistry): CanvasData {
  const about = createSection("about", widgets);

  return {
    usernameInput: "",
    status: "idle",
    errorMessage: null,
    profile: null,
    familyId: "github",
    mode: "light",
    layout: {
      version: 1,
      sections: about ? [about] : [],
    },
    selectedSectionId: about?.id ?? null,
  };
}

export function setUsernameInput(
  data: CanvasData,
  usernameInput: string,
): CanvasData {
  return { ...data, usernameInput };
}

export function beginImport(data: CanvasData): CanvasData {
  return { ...data, status: "loading", errorMessage: null };
}

export function completeImport(data: CanvasData, profile: Profile): CanvasData {
  return {
    ...data,
    profile,
    status: "success",
    errorMessage: null,
  };
}

export function failImport(data: CanvasData, errorMessage: string): CanvasData {
  return {
    ...data,
    status: "error",
    errorMessage,
  };
}

export function setFamily(data: CanvasData, familyId: string): CanvasData {
  return { ...data, familyId };
}

export function setMode(data: CanvasData, mode: ColorMode): CanvasData {
  return { ...data, mode };
}

export function addWidget(
  data: CanvasData,
  widgetId: string,
  widgets: WidgetRegistry,
): CanvasData {
  const section = createSection(widgetId, widgets);

  if (!section) {
    return data;
  }

  return {
    ...data,
    layout: {
      ...data.layout,
      sections: [...data.layout.sections, section],
    },
    selectedSectionId: section.id,
  };
}

export function toggleSection(data: CanvasData, sectionId: string): CanvasData {
  return {
    ...data,
    layout: {
      ...data.layout,
      sections: data.layout.sections.map((section) =>
        section.id === sectionId
          ? { ...section, enabled: !section.enabled }
          : section,
      ),
    },
  };
}

export function removeSection(data: CanvasData, sectionId: string): CanvasData {
  const sections = data.layout.sections.filter(
    (section) => section.id !== sectionId,
  );
  const selectedSectionId =
    data.selectedSectionId === sectionId
      ? (sections[0]?.id ?? null)
      : data.selectedSectionId;

  return {
    ...data,
    layout: { ...data.layout, sections },
    selectedSectionId,
  };
}

export function moveSectionTo(
  data: CanvasData,
  sectionId: string,
  toIndex: number,
): CanvasData {
  return {
    ...data,
    layout: moveSectionInLayout(data.layout, sectionId, toIndex),
  };
}

export function updateSectionConfig(
  data: CanvasData,
  sectionId: string,
  config: unknown,
): CanvasData {
  return {
    ...data,
    layout: {
      ...data.layout,
      sections: data.layout.sections.map((section) =>
        section.id === sectionId ? { ...section, config } : section,
      ),
    },
  };
}

export function selectSection(
  data: CanvasData,
  selectedSectionId: string | null,
): CanvasData {
  return { ...data, selectedSectionId };
}

export function composeDocumentMarkdown(
  data: CanvasDocument,
  widgets: WidgetRegistry,
): string {
  const theme = currentTheme(data.familyId, data.mode);

  return composeMarkdown({
    document: {
      profile: data.profile,
      layout: data.layout,
      themeId: theme.id,
      mode: theme.mode,
    },
    theme,
    widgets,
  });
}
