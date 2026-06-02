import type {
  SentenceNode
} from "../composite/sentence";

import type {
  ExtractedSentence
} from "../extractor.types";

import {
  normalizeWord
} from "./word-normalizer";

export function normalizeSentence(
  sentence: SentenceNode
): ExtractedSentence {

  return {

    id:
      sentence.id,

    kind:
      "sentence",

    text:
      sentence.text,

    x:
      sentence.x,

    y:
      sentence.y,

    width:
      sentence.width,

    height:
      sentence.height,

    endX:
      sentence.endX,

    endY:
      sentence.endY,

    page:
      sentence.page,

    words:
      sentence.words.map(
        normalizeWord
      )
  };
}
