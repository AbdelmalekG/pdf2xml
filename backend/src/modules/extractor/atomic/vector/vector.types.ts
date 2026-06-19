import type {
  BaseAtomicNode,
  AtomicNodeKind
} from "../atomic.types";

export const VectorNodeKind = {
  line: "line",
  curve: "curve"
} as const;

export type VectorNodeKind =
  (typeof VectorNodeKind)[keyof typeof VectorNodeKind];

export type RawVectorLineNode =
  BaseAtomicNode & {

    kind:
      typeof AtomicNodeKind.vector;

    vectorKind:
      typeof VectorNodeKind.line;

    flippedY: boolean;

    x1: number;
    y1: number;

    x2: number;
    y2: number;
  };

export type CurveSegment = {
  cp1x: number;
  cp1y: number;

  cp2x: number;
  cp2y: number;

  x: number;
  y: number;
};

export type RawVectorCurveNode =
  BaseAtomicNode & {

    kind:
      typeof AtomicNodeKind.vector;
    
    vectorKind:
      typeof VectorNodeKind.curve;

    flippedY: boolean;

    startX: number;
    startY: number;

    segments: CurveSegment[];
  };

export type RawVectorNode =
  | RawVectorLineNode
  | RawVectorCurveNode;