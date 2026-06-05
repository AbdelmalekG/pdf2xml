import type {
  BaseAtomicNode
} from "../atomic.types";

import {
  AtomicNodeKind
} from "../atomic.types";

export type RawVectorNode =
  BaseAtomicNode & {

    kind:
      typeof AtomicNodeKind.vector;

    x1: number;
    y1: number;

    x2: number;
    y2: number;
  };