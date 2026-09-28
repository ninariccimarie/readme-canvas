import type { DragEndEvent } from "@dnd-kit/core";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, Switch, cn } from "@readme-canvas/ui";
import { widgetRegistry } from "../canvas/registry";
import { useCanvasStore } from "../canvas/store";

function SortableSection({
  id,
  name,
  enabled,
  selected,
}: {
  id: string;
  name: string;
  enabled: boolean;
  selected: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const selectSection = useCanvasStore((state) => state.selectSection);
  const toggleSection = useCanvasStore((state) => state.toggleSection);
  const removeSection = useCanvasStore((state) => state.removeSection);

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "flex items-center gap-2 rounded-md border border-border bg-card p-2",
        selected && "ring-2 ring-ring",
        isDragging && "opacity-70",
      )}
    >
      <button
        type="button"
        className="flex size-8 shrink-0 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-accent"
        aria-label={`Reorder ${name}`}
        {...attributes}
        {...listeners}
      >
        <span aria-hidden="true">⋮⋮</span>
      </button>
      <button
        type="button"
        className="min-w-0 flex-1 truncate text-left text-sm font-medium"
        onClick={() => selectSection(id)}
      >
        {name}
      </button>
      <Switch
        checked={enabled}
        onCheckedChange={() => toggleSection(id)}
        aria-label={`Enable ${name}`}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => removeSection(id)}
      >
        Remove
      </Button>
    </li>
  );
}

export function SectionList() {
  const sections = useCanvasStore((state) => state.layout.sections);
  const selectedSectionId = useCanvasStore((state) => state.selectedSectionId);
  const moveSectionTo = useCanvasStore((state) => state.moveSectionTo);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const toIndex = sections.findIndex((section) => section.id === over.id);

    if (toIndex >= 0) {
      moveSectionTo(String(active.id), toIndex);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={sections.map((section) => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-2" aria-label="README sections">
          {sections.map((section) => {
            const widget = widgetRegistry.get(section.widgetId);

            return (
              <SortableSection
                key={section.id}
                id={section.id}
                name={widget?.name ?? section.widgetId}
                enabled={section.enabled}
                selected={section.id === selectedSectionId}
              />
            );
          })}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
