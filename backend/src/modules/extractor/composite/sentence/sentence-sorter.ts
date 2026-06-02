import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

import {
  SENTENCE_Y_THRESHOLD
} from "./sentence.constants";

export function sortWords(
  words: RawWordNode[]
) {

  return [...words].sort(
    (a, b) => {

      if (
        a.page !== b.page
      ) {
        return a.page - b.page;
      }

      const yDifference =
        b.y - a.y;

      if (
        Math.abs(yDifference)
        > SENTENCE_Y_THRESHOLD
      ) {
        return yDifference;
      }

      return a.x - b.x;
    }
  );
}