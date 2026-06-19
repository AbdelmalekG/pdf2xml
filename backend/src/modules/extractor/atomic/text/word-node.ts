import type {
  RawWordNode,
  TextDirection
} from "./word.types";

import {
  AtomicNodeKind
} from "../atomic.types";

import {
  calculateEndX,
  calculateEndY
} from "./word.utils";

type CreateWordNodeParams = {

  id: string;

  text: string;

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;

  direction?: TextDirection;

  transform?: number[];
};

export function createWordNode({
  id,
  text,
  x,
  y,
  width,
  height,
  page,
  direction,
  transform
}: CreateWordNodeParams): RawWordNode {

  return {

    id,

    kind:
      AtomicNodeKind.word,

    text,

    x,
    y,

    width,
    height,

    endX:
      calculateEndX(
        x,
        width
      ),

    endY:
      calculateEndY(
        y,
        height
      ),

    page,

    ...(direction !== undefined && { direction }),

    ...(transform !== undefined && { transform })
  };
}