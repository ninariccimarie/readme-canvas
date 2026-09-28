import type { SectionId } from "../domain/ids";
import type { Layout, Section } from "../domain/section";

export function visibleSections(layout: Layout): Section[] {
  return layout.sections.filter((section) => section.enabled);
}

export function moveSection(
  layout: Layout,
  sectionId: SectionId,
  toIndex: number,
): Layout {
  const fromIndex = layout.sections.findIndex(
    (section) => section.id === sectionId,
  );

  if (fromIndex === -1 || layout.sections.length === 0) {
    return layout;
  }

  const clampedIndex = Math.max(
    0,
    Math.min(toIndex, layout.sections.length - 1),
  );

  if (fromIndex === clampedIndex) {
    return layout;
  }

  const sections = [...layout.sections];
  const [moved] = sections.splice(fromIndex, 1);
  sections.splice(clampedIndex, 0, moved);

  return { ...layout, sections };
}
