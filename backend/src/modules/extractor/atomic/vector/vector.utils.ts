import {
  PAGE_SHAPE_THRESHOLD,
  VECTOR_LINE_THICKNESS
} from "./vector.constants";

export function isPageSizedShape(
  width: number,
  height: number,
  pageWidth: number,
  pageHeight: number
): boolean {

  return (
    width >= pageWidth * PAGE_SHAPE_THRESHOLD &&
    height >= pageHeight * PAGE_SHAPE_THRESHOLD
  );
}

export function isHorizontalVector(
  width: number,
  height: number
): boolean {

  return (
    height <= VECTOR_LINE_THICKNESS &&
    width > VECTOR_LINE_THICKNESS
  );
}

export function isVerticalVector(
  width: number,
  height: number
): boolean {

  return (
    width <= VECTOR_LINE_THICKNESS &&
    height > VECTOR_LINE_THICKNESS
  );
}

export function multiply(
  m1: number[],
  m2: number[]
): number[] {

  return [
    m1[0]! * m2[0]! + m1[2]! * m2[1]!,
    m1[1]! * m2[0]! + m1[3]! * m2[1]!,

    m1[0]! * m2[2]! + m1[2]! * m2[3]!,
    m1[1]! * m2[2]! + m1[3]! * m2[3]!,

    m1[0]! * m2[4]! + m1[2]! * m2[5]! + m1[4]!,
    m1[1]! * m2[4]! + m1[3]! * m2[5]! + m1[5]!
  ];
}

export function extractBezierSegments(
  path: Float32Array
) {

  const segments = [];

  let startX = 0;
  let startY = 0;

  let i = 0;

  while (i < path.length) {

    const op = path[i];

    // moveTo
    if (op === 0) {

      startX = path[i + 1]!;

      startY = path[i + 2]!;

      i += 3;

      continue;
    }

    // curveTo
    if (op === 2) {

      segments.push({

        cp1x: path[i + 1]!,
        cp1y: path[i + 2]!,

        cp2x: path[i + 3]!,
        cp2y: path[i + 4]!,

        x: path[i + 5]!,
        y: path[i + 6]!
      });

      i += 7;

      continue;
    }

    i++;
  }

  return {
    startX,
    startY,
    segments
  };
}

export function transformPoint(
  x: number,
  y: number,
  m: number[]
) {

  return {

    x:
      m[0]! * x +
      m[2]! * y +
      m[4]!,

    y:
      m[1]! * x +
      m[3]! * y +
      m[5]!
  };
}