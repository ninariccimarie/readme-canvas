import { ProfileImport } from "./ProfileImport";
import { SectionList } from "./SectionList";
import { SectionSettings } from "./SectionSettings";
import { SetupSteps } from "./SetupSteps";
import { ThemePicker } from "./ThemePicker";
import { WidgetPicker } from "./WidgetPicker";

export function Controls() {
  return (
    <section
      aria-label="Section controls"
      className="flex min-h-0 flex-col gap-6 overflow-auto border-b border-border p-4 lg:border-r lg:border-b-0"
    >
      <header className="flex flex-col gap-1">
        <h1 className="text-lg font-semibold tracking-tight">README Canvas</h1>
        <p className="text-sm text-muted-foreground">
          Paste a GitHub username, arrange sections, and copy the Markdown.
        </p>
      </header>
      <ProfileImport />
      <ThemePicker />
      <WidgetPicker />
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">Sections</h2>
        <SectionList />
      </div>
      <SectionSettings />
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">Setup</h2>
        <SetupSteps />
      </div>
    </section>
  );
}
