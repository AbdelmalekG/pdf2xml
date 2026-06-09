import {
  buildSentences
} from "./sentence";

import {
  buildLines
} from "./line";

import type {
  BaseAtomicNode
} from "@modules/extractor/atomic";

import type {
  RawWordNode
} from "@modules/extractor/atomic/text";
import { buildIntersections } from "./intersection";
import type { RawVectorNode } from "../atomic/vector";

export async function processComposite(
  atomicNodes: BaseAtomicNode[]
) {

  const words =
    atomicNodes.filter(
      (
        node
      ): node is RawWordNode =>

        node.kind === "word"
    );

  const vectors =
    atomicNodes.filter(
      (
        node
      ): node is RawVectorNode =>

        node.kind === "vector"
    );

  const intersections =
    buildIntersections(
      vectors
    );

  // console.log(
  //   "INTERSECTIONS:",
  //   intersections
  // );

  console.log(
    "Total intersections:",
    intersections.length
  )

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
