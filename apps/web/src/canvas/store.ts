import type { ColorMode } from "@readme-canvas/core";
import { GitHubProfileError, fetchGithubProfile } from "@readme-canvas/integrations";
import { create } from "zustand";
import { widgetRegistry } from "./registry";
import {
  addWidget as addWidgetToData,
  beginImport,
  completeImport,
  createInitialData,
  failImport,
  moveSectionTo as moveSectionInData,
  removeSection as removeSectionFromData,
  selectSection as selectSectionInData,
  setFamily as setFamilyOnData,
  setMode as setModeOnData,
  setUsernameInput as setUsernameOnData,
  toggleSection as toggleSectionInData,
  updateSectionConfig as updateConfigInData,
  type CanvasData,
} from "./state";

export interface CanvasStore extends CanvasData {
  setUsernameInput: (value: string) => void;
  importProfile: (fetchImpl?: typeof fetch) => Promise<void>;
  setFamily: (familyId: string) => void;
  setMode: (mode: ColorMode) => void;
  addWidget: (widgetId: string) => void;
  toggleSection: (sectionId: string) => void;
  removeSection: (sectionId: string) => void;
  moveSectionTo: (sectionId: string, toIndex: number) => void;
  updateSectionConfig: (sectionId: string, config: unknown) => void;
  selectSection: (sectionId: string | null) => void;
}

export function createCanvasStore(fetchImpl: typeof fetch = fetch) {
  return create<CanvasStore>((set, get) => ({
    ...createInitialData(widgetRegistry),
    setUsernameInput: (value) => set(setUsernameOnData(get(), value)),
    importProfile: async (customFetch = fetchImpl) => {
      set(beginImport(get()));
      try {
        const profile = await fetchGithubProfile(
          get().usernameInput,
          customFetch,
        );
        set(completeImport(get(), profile));
      } catch (error) {
        const message =
          error instanceof GitHubProfileError
            ? error.message
            : "Failed to import the GitHub profile";
        set(failImport(get(), message));
      }
    },
    setFamily: (familyId) => set(setFamilyOnData(get(), familyId)),
    setMode: (mode) => set(setModeOnData(get(), mode)),
    addWidget: (widgetId) =>
      set(addWidgetToData(get(), widgetId, widgetRegistry)),
    toggleSection: (sectionId) => set(toggleSectionInData(get(), sectionId)),
    removeSection: (sectionId) => set(removeSectionFromData(get(), sectionId)),
    moveSectionTo: (sectionId, toIndex) =>
      set(moveSectionInData(get(), sectionId, toIndex)),
    updateSectionConfig: (sectionId, config) =>
      set(updateConfigInData(get(), sectionId, config)),
    selectSection: (sectionId) => set(selectSectionInData(get(), sectionId)),
  }));
}

export const useCanvasStore = createCanvasStore();
