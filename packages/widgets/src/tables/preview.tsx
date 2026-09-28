import type { WidgetRenderProps } from "@readme-canvas/core";
import type { TableConfig } from "./schema";

export function Preview({ section, theme }: WidgetRenderProps<TableConfig>) {
  const caption = section.config.caption.trim();

  return (
    <section style={{ color: theme.tokens.text }}>
      {caption ? <p style={{ color: theme.tokens.secondary }}>{caption}</p> : null}
      <table>
        <thead>
          <tr>
            {section.config.columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.config.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {section.config.columns.map((_, columnIndex) => (
                <td key={columnIndex}>{row[columnIndex] ?? ""}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
