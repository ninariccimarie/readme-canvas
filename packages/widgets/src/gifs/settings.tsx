import type { WidgetSettingsProps } from "@readme-canvas/core";
import type { GifConfig } from "./schema";

export function Settings({ section, onChange }: WidgetSettingsProps<GifConfig>) {
  return (
    <div>
      <label>
        GIF URL
        <input
          value={section.config.src}
          onChange={(event) =>
            onChange({ ...section.config, src: event.target.value })
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
