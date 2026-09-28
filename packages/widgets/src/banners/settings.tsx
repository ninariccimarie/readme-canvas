import type { WidgetSettingsProps } from "@readme-canvas/core";
import type { BannerConfig } from "./schema";

export function Settings({ section, onChange }: WidgetSettingsProps<BannerConfig>) {
  return (
    <div>
      <label>
        Image URL
        <input
          value={section.config.imageUrl}
          onChange={(event) =>
            onChange({ ...section.config, imageUrl: event.target.value })
          }
        />
      </label>
      <label>
        Alt text
        <input
          value={section.config.alt}
          onChange={(event) =>
            onChange({ ...section.config, alt: event.target.value })
          }
        />
      </label>
      <label>
        Link
        <input
          value={section.config.href}
          onChange={(event) =>
            onChange({ ...section.config, href: event.target.value })
          }
        />
      </label>
      <label>
        Width
        <input
          value={section.config.width}
          onChange={(event) =>
            onChange({ ...section.config, width: event.target.value })
          }
        />
      </label>
    </div>
  );
}
