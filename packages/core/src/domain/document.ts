import type { ColorMode, ThemeId } from "./ids";
import type { Layout } from "./section";
import type { Profile } from "./profile";

export interface ReadmeDocument {
  profile: Profile | null;
  layout: Layout;
  themeId: ThemeId;
  mode: ColorMode;
}
