import type { WidgetSettingsProps } from "@readme-canvas/core";
import type { GithubStatsConfig } from "./schema";

export function Settings({
  section,
  profile,
  onChange,
}: WidgetSettingsProps<GithubStatsConfig>) {
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
        GitHub username
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
