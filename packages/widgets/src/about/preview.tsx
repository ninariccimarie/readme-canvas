import type { WidgetRenderProps } from "@readme-canvas/core";
import type { AboutConfig } from "./schema";

export function Preview({
  profile,
  section,
  theme,
}: WidgetRenderProps<AboutConfig>) {
  const name =
    section.config.headline.trim() ||
    profile?.name ||
    profile?.username ||
    "About";
  const bio = section.config.body.trim() || profile?.bio || "";

  return (
    <section style={{ color: theme.tokens.text }}>
      {section.config.showAvatar && profile?.avatarUrl ? (
        <img src={profile.avatarUrl} alt={name} width={120} height={120} />
      ) : null}
      <h1>{name}</h1>
      {bio ? <p>{bio}</p> : null}
    </section>
  );
}
