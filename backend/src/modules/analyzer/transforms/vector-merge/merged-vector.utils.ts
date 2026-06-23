import type { RawVectorLineNode } from "@modules/extractor";

import {
  VECTOR_GAP_TOLERANCE,
  VECTOR_ALIGNMENT_TOLERANCE
} from "./merged-vector.constants";

export function nearlyEqual(
  a: number,
  b: number,
  tolerance: number
) {
  return Math.abs(a - b) <= tolerance;
}

export function canMergeHorizontal(
  left: RawVectorLineNode,
  right: RawVectorLineNode
) {

  if (
    !nearlyEqual(
      left.y1,
      right.y1,
      VECTOR_ALIGNMENT_TOLERANCE
    )
  ) {
    return false;
  }

  const gap =
    right.x1 - left.x2;

  return (
    gap >= 0 &&
    gap <= VECTOR_GAP_TOLERANCE
  );
}

export function canMergeVertical(
  top: RawVectorLineNode,
  bottom: RawVectorLineNode
) {

  if (
    !nearlyEqual(
      top.x1,
      bottom.x1,
      VECTOR_ALIGNMENT_TOLERANCE
    )
  ) {
    return false;
  }

  const gap =
    bottom.y1 - top.y2;

  return (
    gap >= 0 &&
    gap <= VECTOR_GAP_TOLERANCE
  );
}