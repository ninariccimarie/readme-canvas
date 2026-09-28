import type { WidgetSettingsProps } from "@readme-canvas/core";
import { Button } from "@readme-canvas/ui";
import { SOCIAL_PLATFORMS } from "./platforms";
import { socialsSchema, type SocialsConfig } from "./schema";

export function Settings({ section, onChange }: WidgetSettingsProps<SocialsConfig>) {
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
        Display style
        <select
          aria-label="Display style"
          value={section.config.style}
          onChange={(event) => {
            const parsed = socialsSchema.shape.style.safeParse(event.target.value);
            if (parsed.success) {
              onChange({ ...section.config, style: parsed.data });
            }
          }}
        >
          <option value="icons">Icons</option>
          <option value="text">Text</option>
          <option value="badges">Badges</option>
        </select>
      </label>
      {section.config.items.map((item) => (
        <fieldset key={item.id}>
          <legend>{item.name || "Custom"}</legend>
          <label>
            Name
            <input
              value={item.name}
              onChange={(event) =>
                onChange({
                  ...section.config,
                  items: section.config.items.map((entry) =>
                    entry.id === item.id
                      ? { ...entry, name: event.target.value }
                      : entry,
                  ),
                })
              }
            />
          </label>
          <label>
            URL
            <input
              value={item.url}
              onChange={(event) =>
                onChange({
                  ...section.config,
                  items: section.config.items.map((entry) =>
                    entry.id === item.id
                      ? { ...entry, url: event.target.value }
                      : entry,
                  ),
                })
              }
            />
          </label>
          <label>
            Logo
            <input
              value={item.logo ?? ""}
              onChange={(event) =>
                onChange({
                  ...section.config,
                  items: section.config.items.map((entry) =>
                    entry.id === item.id
                      ? { ...entry, logo: event.target.value || null }
                      : entry,
                  ),
                })
              }
            />
          </label>
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              onChange({
                ...section.config,
                items: section.config.items.filter((entry) => entry.id !== item.id),
              })
            }
          >
            Remove
          </Button>
        </fieldset>
      ))}
      <label>
        Add platform
        <select
          aria-label="Add platform"
          defaultValue=""
          onChange={(event) => {
            const platform = SOCIAL_PLATFORMS.find(
              (entry) => entry.id === event.target.value,
            );
            event.target.value = "";
            if (!platform) {
              return;
            }
            onChange({
              ...section.config,
              items: [
                ...section.config.items,
                {
                  id: crypto.randomUUID(),
                  name: platform.name,
                  url: "",
                  logo: platform.logo,
                  platformId: platform.id,
                },
              ],
            });
          }}
        >
          <option value="">Select a platform</option>
          {SOCIAL_PLATFORMS.map((platform) => (
            <option key={platform.id} value={platform.id}>
              {platform.name}
            </option>
          ))}
        </select>
      </label>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange({
            ...section.config,
            items: [
              ...section.config.items,
              {
                id: crypto.randomUUID(),
                name: "",
                url: "",
                logo: null,
                platformId: null,
              },
            ],
          })
        }
      >
        Add custom
      </Button>
    </div>
  );
}
