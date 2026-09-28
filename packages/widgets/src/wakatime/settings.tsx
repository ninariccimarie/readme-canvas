import type { WidgetSettingsProps } from "@readme-canvas/core";
import type { WakaTimeConfig } from "./schema";

export function Settings({
  section,
  profile,
  onChange,
}: WidgetSettingsProps<WakaTimeConfig>) {
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
      <label>
        WakaTime username
        <input
          value={section.config.username}
          placeholder={profile?.username ?? ""}
          onChange={(event) =>
            onChange({ ...section.config, username: event.target.value })
          }
        />
      </label>
    </div>
  );
}
