import type { Profile } from "../domain/profile";
import type { Section } from "../domain/section";
import type { Theme } from "../domain/theme";

export interface WidgetGenerateContext<TConfig = unknown> {
  section: Section<TConfig>;
  profile: Profile | null;
  theme: Theme;
}

export interface WidgetRenderProps<TConfig = unknown> {
  section: Section<TConfig>;
  profile: Profile | null;
  theme: Theme;
}

export interface WidgetSettingsProps<TConfig = unknown> {
  section: Section<TConfig>;
  profile: Profile | null;
  onChange: (config: TConfig) => void;
}

export interface IntegrationContext {
  profile: Profile | null;
  theme: Theme;
}
