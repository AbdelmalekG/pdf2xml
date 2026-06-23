import type {
  RawVectorCurveNode,
  RawVectorLineNode
} from "@modules/extractor";

import {
  createVectorNode
} from "@modules/extractor/atomic/vector";

export function recoverCurveLines(
  curve: RawVectorCurveNode
): RawVectorLineNode[] {

  const {
    page,
    flippedY
  } = curve;

  const left =
    curve.x;

  const right =
    curve.x +
    curve.width;

  const bottom =
    curve.y;

  const top =
    curve.y +
    curve.height;

  const borders = [

    {
      suffix: "top",

      x1: left,
      y1: top,

      x2: right,
      y2: top
    },

    {
      suffix: "right",

      x1: right,
      y1: bottom,

      x2: right,
      y2: top
    },

    {
      suffix: "bottom",

      x1: left,
      y1: bottom,

      x2: right,
      y2: bottom
    },

    {
      suffix: "left",

      x1: left,
      y1: bottom,

      x2: left,
      y2: top
    }
  ];

  return borders.map(
    border =>

      createVectorNode({

        id:
          `${curve.id}-${border.suffix}`,

        x1:
          border.x1,

        y1:
          border.y1,

        x2:
          border.x2,

        y2:
          border.y2,

        page,

        flippedY
      })
  );
}

export function isRoundedRectangle(
  curve: RawVectorCurveNode
) {

  return (
    curve.segments.length === 8
  );
}