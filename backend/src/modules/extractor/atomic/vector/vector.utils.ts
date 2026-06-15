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