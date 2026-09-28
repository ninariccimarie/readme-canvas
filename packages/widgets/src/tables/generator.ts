import type { WidgetGenerateContext } from "@readme-canvas/core";
import type { TableConfig } from "./schema";

function escapeCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}

export function generateMarkdown({
  section,
}: WidgetGenerateContext<TableConfig>): string {
  const columns = section.config.columns.map((column) => column.trim());

  if (columns.every((column) => column.length === 0)) {
    const hasCell = section.config.rows.some((row) =>
      row.some((cell) => cell.trim().length > 0),
    );

    if (!hasCell) {
      return "";
    }
  }

  const headers = columns.map((column) => escapeCell(column));
  const header = `| ${headers.join(" | ")} |`;
  const separator = `| ${headers.map(() => "---").join(" | ")} |`;
  const body = section.config.rows.map((row) => {
    const cells = headers.map((_, index) => escapeCell(row[index] ?? ""));
    return `| ${cells.join(" | ")} |`;
  });
  const table = [header, separator, ...body].join("\n");
  const caption = section.config.caption.trim();

  return caption ? `**${caption}**\n\n${table}` : table;
}
