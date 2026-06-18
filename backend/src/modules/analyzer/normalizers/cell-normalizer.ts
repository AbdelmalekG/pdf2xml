import type {
  CellNode
} from "../structural";

import type {
  Cell
} from "../analyzer.types";

export function normalizeCell(
  cell: CellNode
): Cell {

  return {

    id:
      String(cell.id),

    kind:
      "cell",

    x:
      cell.x,

    y:
      cell.y,

    endX:
      cell.endX,

    endY:
      cell.endY,

    width:
      cell.width,

    height:
      cell.height,

    children:
      cell.children,

    page:
      cell.page
  };
}
