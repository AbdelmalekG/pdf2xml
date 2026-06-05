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

export function isHorizontalLine(
  width: number,
  height: number
): boolean {

  return (
    height <= VECTOR_LINE_THICKNESS &&
    width > VECTOR_LINE_THICKNESS
  );
}

export function isVerticalLine(
  width: number,
  height: number
): boolean {

  return (
    width <= VECTOR_LINE_THICKNESS &&
    height > VECTOR_LINE_THICKNESS
  );
}