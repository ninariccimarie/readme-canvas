/// <reference types="vite/client" />

import type { WidgetManifest, WidgetRegistry } from "@readme-canvas/core";

interface WidgetModule {
  manifest: WidgetManifest;
}

const modules = import.meta.glob<WidgetModule>("./*/manifest.ts", {
  eager: true,
});

export function discoverWidgets(): WidgetManifest[] {
  return Object.values(modules)
    .map((module) => module.manifest)
    .filter((manifest): manifest is WidgetManifest => manifest != null)
    .sort((left, right) => left.id.localeCompare(right.id));
}

export function toWidgetRegistry(
  widgets: WidgetManifest[] = discoverWidgets(),
): WidgetRegistry {
  return new Map(widgets.map((widget) => [widget.id, widget]));
}
