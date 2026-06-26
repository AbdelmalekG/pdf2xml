import type {
  SentenceNode
} from "../composite/sentence";

import type {
  Sentence
} from "../analyzer.types";

import {
  normalizeWord
} from "@modules/extractor/normalizers";

export function normalizeSentence(
  sentence: SentenceNode
): Sentence {

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

    words:
      sentence.words.map(
        normalizeWord
      ),

    page:
      sentence.page,

  };
}
