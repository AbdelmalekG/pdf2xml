import type {
  ExtractedObject
} from "../extractor.types";

const SAME_LINE_Y_THRESHOLD =
  5;

export function sortObjects(
  objects: ExtractedObject[]
): ExtractedObject[] {

  return [...objects].sort(
    (
      a,
      b
    ) => {

      if (
        a.page !== b.page
      ) {
        return a.page - b.page;
      }

      const yDifference =
        b.y - a.y;

      if (
        Math.abs(yDifference)
        > SAME_LINE_Y_THRESHOLD
      ) {
        return yDifference;
      }

      return a.x - b.x;
    }
  );
}
