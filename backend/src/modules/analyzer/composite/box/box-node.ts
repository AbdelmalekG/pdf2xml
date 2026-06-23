import type {
  BoxContentNode,
  BoxNode
} from "./box.types";

export function createBoxNode(

  id: string,

  x: number,
  y: number,

  endX: number,
  endY: number,

  page: number,

  children:
    BoxContentNode[]

): BoxNode {

  return {

    id,

    kind:
      "box",

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