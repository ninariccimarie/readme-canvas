import type { WidgetRenderProps } from "@readme-canvas/core";
import type { SocialsConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<SocialsConfig>) {
  const heading = section.config.heading.trim();
  const items = section.config.items.filter(
    (item) => item.name.trim() && item.url.trim(),
  );

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      <p>
        {items.map((item) => (
          <a
            key={item.id}
            href={item.url}
            style={{ color: theme.tokens.primary, marginRight: 8 }}
          >
            {item.name}
          </a>
        ))}
      </p>
    </section>
  );
}
