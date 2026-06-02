import type {
  LineChildNode
} from "./line.types";

export function areOnSameLine(
  current: LineChildNode,
  next: LineChildNode,
  threshold: number
) {

  return (
    Math.abs(
      current.y - next.y
    ) <= threshold
  );
}
