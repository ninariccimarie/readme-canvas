import type { WidgetSettingsProps } from "@readme-canvas/core";
import { Button, HexColorInput } from "@readme-canvas/ui";
import { SKILL_CATALOG } from "./catalog";
import {
  normalizeSkillsConfig,
  skillItemBadgeDefaults,
  skillsSchema,
  type SkillItem,
  type SkillsConfig,
} from "./schema";

function patchItem(
  config: SkillsConfig,
  id: string,
  patch: Partial<SkillItem>,
): SkillsConfig {
  return {
    ...config,
    items: config.items.map((entry) =>
      entry.id === id ? { ...entry, ...patch } : entry,
    ),
  };
}

export function Settings({ section, onChange }: WidgetSettingsProps<SkillsConfig>) {
  const config = normalizeSkillsConfig(section.config);

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
        Style
        <select
          aria-label="Style"
          value={config.style}
          onChange={(event) => {
            const parsed = skillsSchema.shape.style.safeParse(event.target.value);
            if (parsed.success) {
              onChange({ ...config, style: parsed.data });
            }
          }}
        >
          <option value="flat">flat</option>
          <option value="flat-square">flat-square</option>
          <option value="plastic">plastic</option>
          <option value="for-the-badge">for-the-badge</option>
          <option value="social">social</option>
        </select>
      </label>
      {config.items.map((item) => (
        <fieldset key={item.id}>
          <legend>{item.name || "Custom"}</legend>
          <label>
            Name
            <input
              value={item.name}
              onChange={(event) =>
                onChange(patchItem(config, item.id, { name: event.target.value }))
              }
            />
          </label>
          <label>
            URL
            <input
              value={item.url ?? ""}
              onChange={(event) =>
                onChange(
                  patchItem(config, item.id, {
                    url: event.target.value || null,
                  }),
                )
              }
            />
          </label>
          <label>
            logo
            <input
              value={item.logo}
              placeholder="typescript"
              onChange={(event) =>
                onChange(patchItem(config, item.id, { logo: event.target.value }))
              }
            />
          </label>
          <label>
            logoColor
            <HexColorInput
              aria-label="logoColor"
              value={item.logoColor}
              placeholder="white"
              onChange={(value) =>
                onChange(patchItem(config, item.id, { logoColor: value }))
              }
            />
          </label>
          <label>
            logoSize
            <input
              value={item.logoSize}
              placeholder="auto"
              onChange={(event) =>
                onChange(
                  patchItem(config, item.id, { logoSize: event.target.value }),
                )
              }
            />
          </label>
          <label>
            label
            <input
              value={item.label}
              placeholder={item.name || "label"}
              onChange={(event) =>
                onChange(patchItem(config, item.id, { label: event.target.value }))
              }
            />
          </label>
          <label>
            labelColor
            <HexColorInput
              aria-label="labelColor"
              value={item.labelColor}
              placeholder="abcdef"
              onChange={(value) =>
                onChange(patchItem(config, item.id, { labelColor: value }))
              }
            />
          </label>
          <label>
            color
            <HexColorInput
              aria-label="color"
              value={item.color}
              placeholder="007ACC"
              onChange={(value) =>
                onChange(patchItem(config, item.id, { color: value }))
              }
            />
          </label>
          <label>
            link
            <input
              value={item.link}
              placeholder="https://example.com"
              onChange={(event) =>
                onChange(patchItem(config, item.id, { link: event.target.value }))
              }
            />
          </label>
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              onChange({
                ...config,
                items: config.items.filter((entry) => entry.id !== item.id),
              })
            }
          >
            Remove
          </Button>
        </fieldset>
      ))}
      <label>
        Add skill
        <select
          aria-label="Add skill"
          defaultValue=""
          onChange={(event) => {
            const skill = SKILL_CATALOG.find((entry) => entry.id === event.target.value);
            event.target.value = "";
            if (!skill) {
              return;
            }
            onChange({
              ...config,
              items: [
                ...config.items,
                {
                  id: crypto.randomUUID(),
                  name: skill.name,
                  url: null,
                  catalogId: skill.id,
                  ...skillItemBadgeDefaults,
                  logo: skill.logo,
                },
              ],
            });
          }}
        >
          <option value="">Select a skill</option>
          {SKILL_CATALOG.map((skill) => (
            <option key={skill.id} value={skill.id}>
              {skill.name}
            </option>
          ))}
        </select>
      </label>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange({
            ...config,
            items: [
              ...config.items,
              {
                id: crypto.randomUUID(),
                name: "",
                url: null,
                catalogId: null,
                ...skillItemBadgeDefaults,
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
