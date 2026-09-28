import { toWidgetRegistry } from "@readme-canvas/widgets";

export const widgetRegistry = toWidgetRegistry();
export const widgets = [...widgetRegistry.values()];
