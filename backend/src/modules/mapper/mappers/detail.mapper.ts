import type {
  Table
} from "@modules/analyzer";

export function mapDetail(
  table: Table
): Table {

  return {

    ...table,

    rows:
      table.rows.slice(0, -1)

  };
}