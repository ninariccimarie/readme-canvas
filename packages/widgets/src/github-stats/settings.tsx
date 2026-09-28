import type { WidgetSettingsProps } from "@readme-canvas/core";
import {
  githubStatsSchema,
  normalizeGithubStatsConfig,
  type GithubStatsConfig,
} from "./schema";

export function Settings({
  section,
  profile,
  onChange,
}: WidgetSettingsProps<GithubStatsConfig>) {
  const config = normalizeGithubStatsConfig(section.config);
  const card = config.card;

  return (
    <div>
      <label>
        Heading
        <input
          value={config.heading}
          onChange={(event) =>
            onChange({ ...config, heading: event.target.value })
          }
        />
      </label>
      <label>
        Card type
        <select
          aria-label="Card type"
          value={card}
          onChange={(event) => {
            const parsed = githubStatsSchema.shape.card.safeParse(
              event.target.value,
            );
            if (parsed.success) {
              onChange({ ...config, card: parsed.data });
            }
          }}
        >
          <option value="stats">Stats</option>
          <option value="top-langs">Top languages</option>
          <option value="pin">Pin repository</option>
          <option value="gist">Gist</option>
          <option value="custom">Custom</option>
        </select>
      </label>
      {card === "gist" ? null : (
        <label>
          GitHub username
          <input
            value={config.username}
            placeholder={profile?.username ?? ""}
            onChange={(event) =>
              onChange({ ...config, username: event.target.value })
            }
          />
        </label>
      )}
      {card === "pin" ? (
        <label>
          Repository
          <input
            value={config.repo}
            placeholder="hello-world"
            onChange={(event) =>
              onChange({ ...config, repo: event.target.value })
            }
          />
        </label>
      ) : null}
      {card === "gist" ? (
        <label>
          Gist id
          <input
            value={config.gistId}
            onChange={(event) =>
              onChange({ ...config, gistId: event.target.value })
            }
          />
        </label>
      ) : null}
      <label>
        Extra query
        <textarea
          aria-label="Extra query"
          value={config.extraQuery}
          placeholder="hide=stars&show_icons=true"
          onChange={(event) =>
            onChange({ ...config, extraQuery: event.target.value })
          }
        />
      </label>
    </div>
  );
}
