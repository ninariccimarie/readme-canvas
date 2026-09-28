import { collectSetupSteps } from "../canvas/setup";
import { widgetRegistry } from "../canvas/registry";
import { useCanvasStore } from "../canvas/store";

export function SetupSteps() {
  const profile = useCanvasStore((state) => state.profile);
  const familyId = useCanvasStore((state) => state.familyId);
  const mode = useCanvasStore((state) => state.mode);
  const layout = useCanvasStore((state) => state.layout);
  const steps = collectSetupSteps(
    { profile, familyId, mode, layout },
    widgetRegistry,
  );

  return (
    <ol className="flex list-decimal flex-col gap-3 pl-4 text-sm">
      {steps.map((step) => (
        <li key={step.title}>
          <p className="font-medium">{step.title}</p>
          <p className="text-muted-foreground">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
