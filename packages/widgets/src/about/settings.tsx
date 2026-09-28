import type { WidgetSettingsProps } from "@readme-canvas/core";
import { Switch } from "@readme-canvas/ui";
import type { AboutConfig } from "./schema";

export function Settings({ section, onChange }: WidgetSettingsProps<AboutConfig>) {
  return (
    <div>
      <label>
        Headline
        <input
          value={section.config.headline}
          onChange={(event) =>
            onChange({ ...section.config, headline: event.target.value })
          }
        />
      </label>
      <label>
        Body
        <textarea
          value={section.config.body}
          onChange={(event) =>
            onChange({ ...section.config, body: event.target.value })
          }
        />
      </label>
      <Switch
        checked={section.config.showAvatar}
        onCheckedChange={(showAvatar) =>
          onChange({ ...section.config, showAvatar })
        }
        aria-label="Show avatar"
      />
    </div>
  );
}
