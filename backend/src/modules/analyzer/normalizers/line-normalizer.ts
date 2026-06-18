import type {
  LineNode
} from "../composite/line";

import type {
  Line
} from "../analyzer.types";

import {
  normalizeSentence
} from "./sentence-normalizer";

import {
  normalizeWord
} from "../../extractor/normalizers/word-normalizer";

export function normalizeLine(
  line: LineNode
): Line {

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
