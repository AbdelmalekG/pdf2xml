import {
  AtomicNodeKind
} from "../atomic.types";

import {
  VectorNodeKind,
  type RawVectorLineNode
} from "./vector.types";

type CreateVectorNodeParams = {

  id: string;

  x1: number;
  y1: number;

  x2: number;
  y2: number;

  flippedY: boolean;

  page: number;
};

export function createVectorNode({
  id,
  x1,
  y1,
  x2,
  y2,
  flippedY,
  page
}: CreateVectorNodeParams): RawVectorLineNode {

  return {

    id,

    kind:
      AtomicNodeKind.vector,

    vectorKind:
      VectorNodeKind.line,

    x:
      Math.min(x1, x2),

    y:
      Math.min(y1, y2),

    width:
      Math.abs(x2 - x1),

    height:
      Math.abs(y2 - y1),

    page,

    x1,
    y1,

    x2,
    y2,

    flippedY
  };
}