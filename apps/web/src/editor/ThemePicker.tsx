import { listFamilies } from "@readme-canvas/themes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@readme-canvas/ui";
import { useCanvasStore } from "../canvas/store";
import { fieldClassName } from "./fields";

export function ThemePicker() {
  const familyId = useCanvasStore((state) => state.familyId);
  const mode = useCanvasStore((state) => state.mode);
  const setFamily = useCanvasStore((state) => state.setFamily);
  const setMode = useCanvasStore((state) => state.setMode);
  const families = listFamilies();

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">
        Theme
        <Select value={familyId} onValueChange={setFamily}>
          <SelectTrigger className="mt-1 w-full" aria-label="Theme family">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {families.map((family) => (
              <SelectItem key={family.id} value={family.id}>
                {family.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
      <label className="text-sm font-medium">
        Mode
        <select
          className={fieldClassName}
          aria-label="Color mode"
          value={mode}
          onChange={(event) =>
            setMode(event.target.value === "dark" ? "dark" : "light")
          }
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
  );
}
