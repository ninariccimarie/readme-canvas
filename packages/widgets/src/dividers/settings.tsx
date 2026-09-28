import type { WidgetSettingsProps } from "@readme-canvas/core";
import { dividerSchema, type DividerConfig } from "./schema";

export function Settings({ section, onChange }: WidgetSettingsProps<DividerConfig>) {
  return (
    <div>
      <label>
        Kind
        <select
          aria-label="Divider kind"
          value={section.config.kind}
          onChange={(event) => {
            const parsed = dividerSchema.shape.kind.safeParse(event.target.value);
            if (parsed.success) {
              onChange({ ...section.config, kind: parsed.data });
            }
          }}
        >
          <option value="line">Line</option>
          <option value="image">Image</option>
        </select>
      </label>
      {section.config.kind === "image" ? (
        <>
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
        </>
      ) : null}
    </div>
  );
}
