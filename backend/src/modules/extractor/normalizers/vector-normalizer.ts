import type {
  RawVectorNode
} from "../atomic/vector";

import type {
  ExtractedVector
} from "../extractor.types";

export function normalizeVector(
  vector: RawVectorNode
): ExtractedVector {

  if (vector.vectorKind === "line") {
    return {

      id:
        String(vector.id),

      kind:
        "vector",

      vectorKind: "line",

      x:
        vector.x,

      y:
        vector.y,

      width:
        vector.width,

      height:
        vector.height,

      page:
        vector.page,

      x1:
        vector.x1,

      y1:
        vector.y1,

      x2:
        vector.x2,

      y2:
        vector.y2,

      flippedY:
        vector.flippedY
    }
  }

  return {

    id: String(vector.id),

    kind: "vector",

    vectorKind: "curve",

    x: vector.x,
    y: vector.y,

    width: vector.width,
    height: vector.height,

    page: vector.page,

    flippedY: vector.flippedY,

    startX: vector.startX,
    startY: vector.startY,

    segments: vector.segments
  };

};