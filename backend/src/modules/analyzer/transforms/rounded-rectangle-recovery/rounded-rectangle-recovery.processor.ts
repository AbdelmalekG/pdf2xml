import type {
  RawVectorNode,
  RawVectorCurveNode,
  RawVectorLineNode
} from "@modules/extractor";

import {
  recoverCurveLines,
  isRoundedRectangle
} from "./rounded-rectangle-recovery.utils";

export function recoverCurveLineVectors(
  vectors: RawVectorNode[]
): RawVectorLineNode[] {

  const recovered:
    RawVectorLineNode[] = [];

  for (
    const vector
    of vectors
  ) {

    if (
      vector.vectorKind !== "curve"
    ) {
      continue;
    }

    if (
      !isRoundedRectangle(
        vector
      )
    ) {
      continue;
    }

    recovered.push(
      ...recoverCurveLines(
        vector as RawVectorCurveNode
      )
    );
  }

  return recovered;
}