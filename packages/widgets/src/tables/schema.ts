import { z } from "zod";

export const tableSchema = z.object({
  caption: z.string(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

export type TableConfig = z.infer<typeof tableSchema>;

export const tableDefaultConfig: TableConfig = {
  caption: "",
  columns: ["", ""],
  rows: [["", ""]],
};
