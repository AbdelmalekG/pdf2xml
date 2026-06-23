import type {
  BoxContentNode,
  BoxNode
} from "./box.types";

import type {
  IntersectionNode
} from "@/modules/analyzer/composite";

import {
  createBoxNode
} from "./box-node";

import {
  sameX,
  sameY,
  countRectangleIntersections,
  isInsideBox
} from "./box.utils";

export function buildBoxes(

  intersections:
    IntersectionNode[],

  objects: BoxContentNode[]

): BoxNode[] {

  const boxes:
    BoxNode[] = [];

  let counter = 0;
  let boxId: string = "";

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

              isInsideBox(

                object,

                topLeft.x,
                topRight.x,

                bottomLeft.y,
                topLeft.y
              )
          );

        boxId = `box-${counter++}`;

        for (
          const child
          of children
        ) {

          child.consumed =
            true;

          child.consumedBy =
            boxId;
        }

        boxes.push(

          createBoxNode(

            boxId,

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

  return boxes;
}