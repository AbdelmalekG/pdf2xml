import type {
  CellContentNode,
  CellNode
} from "./cell.types";

import type {
  IntersectionNode
} from "@/modules/analyzer/composite";

import {
  createCellNode
} from "./cell-node";

import {
  sameX,
  sameY,
  countRectangleIntersections,
  isInsideCell
} from "./cell.utils";

export function buildCells(

  intersections:
    IntersectionNode[],

  objects: CellContentNode[]

): CellNode[] {

  const cells:
    CellNode[] = [];

  let counter = 0;
  let cellId: string = "";

  for (
    const topLeft
    of intersections
  ) {

    for (
      const topRight
      of intersections
    ) {

      if (
        !sameY(
          topRight.y,
          topLeft.y
        )
      ) {
        continue;
      }

      if (
        topRight.x <=
        topLeft.x
      ) {
        continue;
      }

      for (
        const bottomLeft
        of intersections
      ) {

        if (
          !sameX(
            bottomLeft.x,
            topLeft.x
          )
        ) {
          continue;
        }

        if (
          bottomLeft.y >=
          topLeft.y
        ) {
          continue;
        }

        const bottomRight =
          intersections.find(

            candidate =>

              sameX(
                candidate.x,
                topRight.x
              ) &&
              sameY(
                candidate.y,
                bottomLeft.y
              )
          );

        if (
          !bottomRight
        ) {
          continue;
        }

        const intersectionCount =
          countRectangleIntersections(

            intersections,

            topLeft.x,
            topRight.x,

            bottomLeft.y,
            topLeft.y
          );

        if (
          intersectionCount !== 4
        ) {
          continue;
        }

        const children =
          objects.filter(

            object =>

              !object.consumed &&

              isInsideCell(

                object,

                topLeft.x,
                topRight.x,

                bottomLeft.y,
                topLeft.y
              )
          );

        cellId = `cell-${counter++}`;

        for (
          const child
          of children
        ) {

          child.consumed =
            true;

          child.consumedBy =
            cellId;
        }

        cells.push(

          createCellNode(

            cellId,

            topLeft.x,
            bottomLeft.y,

            topRight.x,
            topLeft.y,

            topLeft.page,

            children
          )
        );
      }
    }
  }

  return cells;
}