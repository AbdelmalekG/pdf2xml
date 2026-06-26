import type {
  ColumnNode
} from "../structural/column";

import type {
  Column
} from "../analyzer.types";

export function normalizeColumn(
  column: ColumnNode
): Column {

  return {

    id:
      column.id,

    kind:
      "column",

    x:
      column.x,

    y:
      column.y,

    width:
      column.width,

    height:
      column.height,

    boxes:
      column.boxes,

    page:
      column.page
  };
}