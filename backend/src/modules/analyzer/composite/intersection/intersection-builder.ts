import type {
  RawVectorLineNode
} from "@modules/extractor/atomic/vector";

import type {
  IntersectionNode
} from "./intersection.types";

import {
  intersects
} from "./intersection.utils";

import {
  isHorizontalVector,
  isVerticalVector
} from "@modules/extractor/atomic/vector";

export function buildIntersections(

  vectors: RawVectorLineNode[]

): IntersectionNode[] {

  const intersections:
    IntersectionNode[] = [];

  const horizontals =
    vectors.filter(
      vector =>
        isHorizontalVector(
          vector.width,
          vector.height
        )
    );

  const verticals =
    vectors.filter(
      vector =>
        isVerticalVector(
          vector.width,
          vector.height
        )
    );

  let id = 0;

  for (
    const vertical
    of verticals
  ) {

    for (
      const horizontal
      of horizontals
    ) {

      if (
        !intersects(
          vertical,
          horizontal
        )
      ) {
        continue;
      }

      intersections.push({

        id:
          `intersection-${id++}`,

        kind:
          "intersection",

        x:
          vertical.x1!,

        y:
          horizontal.y1!,

        horizontalId:
          horizontal.id,

        verticalId:
          vertical.id
      });
    }
  }

  return intersections;
}