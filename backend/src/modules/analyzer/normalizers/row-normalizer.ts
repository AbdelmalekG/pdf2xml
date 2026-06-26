import type {
  RowNode
} from "../structural/row";

import type {
  Row
} from "../analyzer.types";

export function normalizeRow(
  row: RowNode
): Row {

  return {

    id:
      row.id,

    kind:
      "row",

    x:
      row.x,

    y:
      row.y,

    width:
      row.width,

    height:
      row.height,

    boxes:
      row.boxes,

    page:
      row.page
  };
}