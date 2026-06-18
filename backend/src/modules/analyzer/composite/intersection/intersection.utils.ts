import type {
  RawVectorNode
} from "@modules/extractor/atomic/vector";

import { INTERSECTION_TOLERANCE } from "./intersection.constants";

export function intersects(
  vertical: RawVectorNode,
  horizontal: RawVectorNode
): boolean {

  const x =
    vertical.x1!;

  const y =
    horizontal.y1!;

  return (

    x >= Math.min(
      horizontal.x1!,
      horizontal.x2!
    ) - INTERSECTION_TOLERANCE &&

    x <= Math.max(
      horizontal.x1!,
      horizontal.x2!
    ) + INTERSECTION_TOLERANCE &&

    y >= Math.min(
      vertical.y1!,
      vertical.y2!
    ) - INTERSECTION_TOLERANCE &&

    y <= Math.max(
      vertical.y1!,
      vertical.y2!
    ) + INTERSECTION_TOLERANCE
  );
}