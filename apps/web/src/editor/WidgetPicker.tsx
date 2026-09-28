import { widgets } from "../canvas/registry";
import { useCanvasStore } from "../canvas/store";
import { fieldClassName } from "./fields";

export function WidgetPicker() {
  const addWidget = useCanvasStore((state) => state.addWidget);

  return (
    <label className="text-sm font-medium">
      Add a section
      <select
        className={fieldClassName}
        aria-label="Add a section"
        defaultValue=""
        onChange={(event) => {
          const widgetId = event.target.value;
          event.target.value = "";
          if (widgetId) {
            addWidget(widgetId);
          }
        }}
      >
        <option value="">Choose a widget</option>
        {widgets.map((widget) => (
          <option key={widget.id} value={widget.id}>
            {widget.name}
          </option>
        ))}
      </select>
    </label>
  );
}
