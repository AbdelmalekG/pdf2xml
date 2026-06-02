import type {
  RawWordNode
} from "../atomic/text";

import type {
  ExtractedWord
} from "../extractor.types";

export function normalizeWord(
  word: RawWordNode
): ExtractedWord {

  return {

    id:
      word.id,

    kind:
      "word",

    text:
      word.text,

    x:
      word.x,

    y:
      word.y,

    width:
      word.width,

    height:
      word.height,

    endX:
      word.endX,

    endY:
      word.endY,

    page:
      word.page,

    ...(word.direction !== undefined && {
      direction:
        word.direction
    }),

    ...(word.transform !== undefined && {
      transform:
        word.transform
    })
  };
}
