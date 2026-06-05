import {
  AtomicNodeKind
} from "../atomic.types";

import type {
  RawVectorNode
} from "./vector.types";

type CreateVectorNodeParams = {

  id: string;

  x1: number;
  y1: number;

  x2: number;
  y2: number;

  page: number;
};

export function createVectorNode({
  id,
  x1,
  y1,
  x2,
  y2,
  page
}: CreateVectorNodeParams): RawVectorNode {

  return {

    id,

    kind:
      AtomicNodeKind.vector,

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
    y2
  };
}