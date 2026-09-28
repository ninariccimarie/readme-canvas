import type { SectionId, WidgetId } from "./ids";

export interface Section<TConfig = unknown> {
  id: SectionId;
  widgetId: WidgetId;
  enabled: boolean;
  config: TConfig;
}

export interface Layout {
  version: 1;
  sections: Section[];
}
