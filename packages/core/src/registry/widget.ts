import type { ComponentType } from "react";
import type { ZodType } from "zod";
import type { IntegrationId, WidgetCategory, WidgetId } from "../domain/ids";
import type { SetupStep } from "../domain/setup";
import type {
  WidgetGenerateContext,
  WidgetRenderProps,
  WidgetSettingsProps,
} from "./context";

export interface WidgetManifest<TConfig = unknown> {
  id: WidgetId;
  name: string;
  category: WidgetCategory;
  description: string;
  defaultConfig: TConfig;
  schema: ZodType<TConfig>;
  Preview: ComponentType<WidgetRenderProps<TConfig>>;
  Settings: ComponentType<WidgetSettingsProps<TConfig>>;
  generateMarkdown: (ctx: WidgetGenerateContext<TConfig>) => string;
  setupInstructions?: (ctx: WidgetGenerateContext<TConfig>) => SetupStep[];
  requiredIntegrations?: IntegrationId[];
}

export type WidgetRegistry = ReadonlyMap<WidgetId, WidgetManifest>;
