import type { WidgetSettingsProps } from "@readme-canvas/core";
import { Button } from "@readme-canvas/ui";
import type { TableConfig } from "./schema";

export function Settings({ section, onChange }: WidgetSettingsProps<TableConfig>) {
  const { columns, rows } = section.config;

  return (
    <div>
      <label>
        Caption
        <input
          value={section.config.caption}
          onChange={(event) =>
            onChange({ ...section.config, caption: event.target.value })
          }
        />
      </label>
      {columns.map((column, columnIndex) => (
        <label key={columnIndex}>
          Column {columnIndex + 1}
          <input
            value={column}
            onChange={(event) =>
              onChange({
                ...section.config,
                columns: columns.map((value, index) =>
                  index === columnIndex ? event.target.value : value,
                ),
              })
            }
          />
        </label>
      ))}
      {rows.map((row, rowIndex) => (
        <fieldset key={rowIndex}>
          <legend>Row {rowIndex + 1}</legend>
          {columns.map((_, columnIndex) => (
            <input
              key={columnIndex}
              aria-label={`Row ${rowIndex + 1} column ${columnIndex + 1}`}
              value={row[columnIndex] ?? ""}
              onChange={(event) =>
                onChange({
                  ...section.config,
                  rows: rows.map((entry, index) =>
                    index === rowIndex
                      ? columns.map((__, cellIndex) =>
                          cellIndex === columnIndex
                            ? event.target.value
                            : (entry[cellIndex] ?? ""),
                        )
                      : entry,
                  ),
                })
              }
            />
          ))}
          <Button
            type="button"
            variant="ghost"
            onClick={() =>
              onChange({
                ...section.config,
                rows: rows.filter((_, index) => index !== rowIndex),
              })
            }
          >
            Remove row
          </Button>
        </fieldset>
      ))}
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange({
            ...section.config,
            columns: [...columns, ""],
            rows: rows.map((row) => [...row, ""]),
          })
        }
      >
        Add column
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={() =>
          onChange({
            ...section.config,
            rows: [...rows, columns.map(() => "")],
          })
        }
      >
        Add row
      </Button>
    </div>
  );
}
