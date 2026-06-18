import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

import {
  SPACE_RATIO_MIN,
  SPACE_RATIO_MAX
} from "./sentence.constants";

export function calculateDynamicSpaceWidthRange(
  word: RawWordNode
) {

  return {
    min:
      word.height *
      SPACE_RATIO_MIN,

    max:
      word.height *
      SPACE_RATIO_MAX
  };
}

export function calculateWordGap(
  current: RawWordNode,
  next: RawWordNode
) {

  return (
    next.x - current.endX
  );
}

export function areWordsOnSameLine(
  current: RawWordNode,
  next: RawWordNode,
  threshold: number
) {

  return (
    Math.abs(
      current.y - next.y
    ) <= threshold
  );
}

export function isExtractableWord(
  word: RawWordNode
) {

  return (
    word.text.trim().length > 0
  );
}
