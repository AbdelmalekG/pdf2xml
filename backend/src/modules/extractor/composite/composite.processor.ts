import {
  buildSentences
} from "./sentence";

import {
  buildLines
} from "./line";

import type {
  AtomicNode
} from "@modules/extractor/atomic/atomic.types";

import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

export async function processComposite(
  atomicNodes: AtomicNode[]
) {

  const words =
    atomicNodes.filter(
      (
        node
      ): node is RawWordNode =>

        node.kind === "word"
    );

  const sentenceResult =
    buildSentences(
      words
    );

  const lineResult =
    buildLines(
      [
        ...sentenceResult.sentences,
        ...sentenceResult.wordSurvivors
      ]
    );

  return {

    wordSurvivors:
      lineResult.wordSurvivors,

    sentences:
      sentenceResult.sentences,

    sentenceSurvivors:
      lineResult.sentenceSurvivors,

    lines:
      lineResult.lines
  };
}
