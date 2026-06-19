import type { RawVectorLineNode } from "@modules/extractor";

import {
  isHorizontalVector,
  isVerticalVector,
  createVectorNode
} from "@extractor/atomic/vector";

import {
  canMergeHorizontal,
  canMergeVertical
} from "./merged-vector.utils";

export function mergeVectors(
  vectors: RawVectorLineNode[]
): RawVectorLineNode[] {

  const horizontals =
    vectors
      .filter(
        vector =>
          isHorizontalVector(
            vector.width,
            vector.height
          )
      )
      .sort(
        (a, b) =>
          a.y1 - b.y1 ||
          a.x1 - b.x1
      );

  const verticals =
    vectors
      .filter(
        vector =>
          isVerticalVector(
            vector.width,
            vector.height
          )
      )
      .sort(
        (a, b) =>
          a.x1 - b.x1 ||
          a.y1 - b.y1
      );

  const mergedHorizontals:
    RawVectorLineNode[] = [];

  if (
    horizontals.length > 0
  ) {

    let current =
      horizontals[0]!;

    for (
      let i = 1;
      i < horizontals.length;
      i++
    ) {

      const next =
        horizontals[i]!;

      if (
        canMergeHorizontal(
          current,
          next
        )
      ) {

        current =
          createVectorNode({

            id:
              current.id,

            x1:
              current.x1,

            y1:
              current.y1,

            x2:
              Math.max(
                current.x2,
                next.x2
              ),

            y2:
              current.y2,

            flippedY:
              current.flippedY,

            page:
              current.page
          });

        continue;
      }

      mergedHorizontals.push(
        current
      );

      current =
        next;
    }

    mergedHorizontals.push(
      current
    );
  }

  const mergedVerticals:
    RawVectorLineNode[] = [];

  if (
    verticals.length > 0
  ) {

    let current =
      verticals[0]!;

    for (
      let i = 1;
      i < verticals.length;
      i++
    ) {

      const next =
        verticals[i]!;

      if (
        canMergeVertical(
          current,
          next
        )
      ) {

        current =
          createVectorNode({

            id:
              current.id,

            x1:
              current.x1,

            y1:
              current.y1,

            x2:
              current.x2,

            y2:
              Math.max(
                current.y2,
                next.y2
              ),

            flippedY:
              current.flippedY,

            page:
              current.page
          });

        continue;
      }

      mergedVerticals.push(
        current
      );

      current =
        next;
    }

    mergedVerticals.push(
      current
    );
  }

  return [

    ...mergedHorizontals,

    ...mergedVerticals
  ];
}