import type {
  CellContentNode
} from "./cell.types";

import type {
  CellNode
} from "./cell.types";

export function createCellNode(

  id: string,

  x: number,
  y: number,

  endX: number,
  endY: number,

  page: number,

  children:
    CellContentNode[]

): CellNode {

  return {

    id,

    kind:
      "cell",

    x,
    y,

    endX,
    endY,

    width:
      endX - x,

    height:
      endY - y,

    children,

    page
  };
}