import type { WidgetRenderProps } from "@readme-canvas/core";
import type { SkillsConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<SkillsConfig>) {
  const heading = section.config.heading.trim();
  const items = section.config.items.filter((item) => item.name.trim());

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      <p>
        {items.map((item) => (
          <span key={item.id} style={{ color: theme.tokens.primary, marginRight: 8 }}>
            {item.name}
          </span>
        ))}
      </p>
    </section>
  );
}
