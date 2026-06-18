import type {
  SentenceNode
} from "./sentence.types";

import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

import {
  CompositeNodeKind
} from "../composite.types";

export function createSentenceNode(
  id: string,
  words: RawWordNode[]
): SentenceNode {

  const first =
    words[0]!;

  const x =
    first.x;

  const y =
    first.y;

  const endX =
    Math.max(
      ...words.map(
        word => word.endX
      )
    );

  const endY =
    Math.max(
      ...words.map(
        word => word.endY
      )
    );

  return {

    id,

    kind:
      CompositeNodeKind.sentence,

    text:
      words
        .map(
          word => word.text
        )
        .join(" "),

    words,

    x,
    y,

    width:
      endX - x,

    height:
      endY - y,

    endX,
    endY,

    page:
      first.page
  };
}