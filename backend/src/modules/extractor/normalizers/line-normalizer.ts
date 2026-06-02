import type {
  LineNode
} from "../composite/line";

import type {
  ExtractedLine
} from "../extractor.types";

import {
  normalizeSentence
} from "./sentence-normalizer";

import {
  normalizeWord
} from "./word-normalizer";

export function normalizeLine(
  line: LineNode
): ExtractedLine {

  return {

    id:
      line.id,

    kind:
      "line",

    x:
      line.x,

    y:
      line.y,

    width:
      line.width,

    height:
      line.height,

    endX:
      line.endX,

    endY:
      line.endY,

    page:
      line.page,

    children:
      line.children.map(
        child =>
          child.kind === "word"
            ? normalizeWord(
              child
            )
            : normalizeSentence(
              child
            )
      )
  };
}
