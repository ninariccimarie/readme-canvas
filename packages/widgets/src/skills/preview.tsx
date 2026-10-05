import type { WidgetRenderProps } from "@readme-canvas/core";
import { buildStaticBadgeUrl } from "@readme-canvas/integrations";
import { staticBadgeParamsFromSkill } from "./badge";
import { normalizeSkillsConfig, type SkillsConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<SkillsConfig>) {
  const config = normalizeSkillsConfig(section.config);
  const heading = config.heading.trim();
  const badges = config.items.flatMap((item) => {
    const params = staticBadgeParamsFromSkill(
      item,
      config.style,
      theme.tokens.primary,
    );

    if (!params) {
      return [];
    }

    return [
      {
        id: item.id,
        url: item.url?.trim() || null,
        alt: params.message,
        src: buildStaticBadgeUrl(params),
      },
    ];
  });

  return (
    <section style={{ color: theme.tokens.text }}>
      {heading ? <h2>{heading}</h2> : null}
      {badges.length === 0 ? (
        <p style={{ color: theme.tokens.secondary }}>Add a skill to show badges.</p>
      ) : (
        <p>
          {badges.map((badge) => {
            const image = <img src={badge.src} alt={badge.alt} />;

            if (!badge.url) {
              return <span key={badge.id}>{image}</span>;
            }

            return (
              <a key={badge.id} href={badge.url}>
                {image}
              </a>
            );
          })}
        </p>
      )}
    </section>
  );
}
