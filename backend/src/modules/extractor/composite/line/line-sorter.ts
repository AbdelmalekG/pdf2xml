import type {
  LineChildNode
} from "./line.types";

import {
  LINE_Y_THRESHOLD
} from "./line.constants";

export function sortLineChildren(
  children: LineChildNode[]
) {

  return [...children].sort(
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
        > LINE_Y_THRESHOLD
      ) {
        return yDifference;
      }

      return a.x - b.x;
    }
  );
}
