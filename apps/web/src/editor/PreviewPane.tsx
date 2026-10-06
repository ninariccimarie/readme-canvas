import { visibleSections } from "@readme-canvas/core";
import { widgetRegistry } from "../canvas/registry";
import { useCanvasStore } from "../canvas/store";
import { currentTheme } from "../canvas/theme";

export function PreviewPane() {
  const layout = useCanvasStore((state) => state.layout);
  const profile = useCanvasStore((state) => state.profile);
  const familyId = useCanvasStore((state) => state.familyId);
  const mode = useCanvasStore((state) => state.mode);
  const theme = currentTheme(familyId, mode);
  const sections = visibleSections(layout);

  return (
    <section
      aria-label="Visual preview"
      className="flex min-h-0 flex-col overflow-auto p-6"
      style={{
        background: theme.tokens.background,
        color: theme.tokens.text,
      }}
    >
      <h2 className="mb-4 text-sm font-medium uppercase tracking-wide opacity-70">
        Preview
      </h2>
      {sections.length === 0 ? (
        <p style={{ color: theme.tokens.secondary }}>
          Enable a section to preview the README.
        </p>
      ) : (
        <div className="readme-preview flex flex-col gap-6">
          {sections.map((section) => {
            const widget = widgetRegistry.get(section.widgetId);

            if (!widget) {
              return null;
            }

            const Preview = widget.Preview;

            return (
              <Preview
                key={section.id}
                section={section}
                profile={profile}
                theme={theme}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
