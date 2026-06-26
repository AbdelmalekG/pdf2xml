import type {
  TableNode
} from "../structural/table";

import type {
  Table
} from "../analyzer.types";

export function normalizeTable(
  table: TableNode
): Table {

  return {

    id:
      table.id,

    kind:
      "table",

    x:
      table.x,

    y:
      table.y,

    width:
      table.width,

    height:
      table.height,

    rows:
      table.rows,

    columns:
      table.columns,

    page:
      table.page
  };
}