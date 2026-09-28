import type { WidgetSettingsProps } from "@readme-canvas/core";
import type { BlogPostsConfig } from "./schema";

export function Settings({
  section,
  onChange,
}: WidgetSettingsProps<BlogPostsConfig>) {
  return (
    <div>
      <label>
        Heading
        <input
          value={section.config.heading}
          onChange={(event) =>
            onChange({ ...section.config, heading: event.target.value })
          }
        />
      </label>
    </div>
  );
}
