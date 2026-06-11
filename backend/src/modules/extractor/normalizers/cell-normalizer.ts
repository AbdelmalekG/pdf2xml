import type {
  CellNode
} from "../structural";

import type {
  ExtractedCell
} from "../extractor.types";

export function normalizeCell(
  cell: CellNode
): ExtractedCell {

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
