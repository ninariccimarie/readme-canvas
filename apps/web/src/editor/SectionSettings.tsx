import { widgetRegistry } from "../canvas/registry";
import { useCanvasStore } from "../canvas/store";

export function SectionSettings() {
  const selectedSectionId = useCanvasStore((state) => state.selectedSectionId);
  const layout = useCanvasStore((state) => state.layout);
  const profile = useCanvasStore((state) => state.profile);
  const updateSectionConfig = useCanvasStore(
    (state) => state.updateSectionConfig,
  );
  const section = layout.sections.find((item) => item.id === selectedSectionId);
  const widget = section ? widgetRegistry.get(section.widgetId) : undefined;

  if (!section || !widget) {
    return (
      <p className="text-sm text-muted-foreground">
        Select a section to edit its settings.
      </p>
    );
  }

  const Settings = widget.Settings;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">{widget.name} settings</h3>
      <div className="flex flex-col gap-2 text-sm [&_input]:h-9 [&_input]:rounded-md [&_input]:border [&_input]:border-input [&_input]:bg-transparent [&_input]:px-3 [&_label]:flex [&_label]:flex-col [&_label]:gap-1 [&_select]:h-9 [&_select]:rounded-md [&_select]:border [&_select]:border-input [&_select]:bg-transparent [&_select]:px-3 [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-input [&_textarea]:bg-transparent [&_textarea]:px-3 [&_textarea]:py-2">
        <Settings
          section={section}
          profile={profile}
          onChange={(config) => updateSectionConfig(section.id, config)}
        />
      </div>
    </div>
  );
}
