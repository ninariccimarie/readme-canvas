import type { WidgetRenderProps } from "@readme-canvas/core";
import type { DividerConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<DividerConfig>) {
  if (section.config.kind === "image" && section.config.imageUrl.trim()) {
    return <img src={section.config.imageUrl} alt={section.config.alt} />;
  }

  return (
    <hr
      style={{
        borderColor: theme.tokens.secondary,
        borderTopWidth: 1,
      }}
    />
  );
}
