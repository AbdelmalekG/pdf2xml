import type {
  IntersectionNode
} from "../../../composite/intersection";

import {
  CELL_TOLERANCE
} from "./cell.constants";
import type { CellContentNode } from "./cell.types";

export function sameX(
  a: number,
  b: number
): boolean {

  return (
    Math.abs(a - b) <=
    CELL_TOLERANCE
  );
}

export function sameY(
  a: number,
  b: number
): boolean {

  return (
    Math.abs(a - b) <=
    CELL_TOLERANCE
  );
}

export function countRectangleIntersections(

  intersections:
    IntersectionNode[],

  left: number,
  right: number,

  bottom: number,
  top: number

): number {

  return intersections.filter(

    intersection =>

      intersection.x >= left - CELL_TOLERANCE &&
      intersection.x <= right + CELL_TOLERANCE &&

      intersection.y >= bottom - CELL_TOLERANCE &&
      intersection.y <= top + CELL_TOLERANCE

  ).length;
}

export function isInsideCell(

  object: CellContentNode,

  left: number,
  right: number,

  bottom: number,
  top: number

): boolean {

  return (

    object.x >= left &&
    object.endX <= right &&

    object.y >= bottom &&
    object.endY <= top
  );
}