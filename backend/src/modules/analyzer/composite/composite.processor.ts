import {
  buildSentences
} from "./sentence";

import {
  buildIntersections
} from "./intersection";

import type {
  BaseAtomicNode,
  RawWordNode,
  RawVectorLineNode
} from "@modules/extractor/atomic";

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
      ): node is RawVectorLineNode =>

        node.kind === "vector"
    );

  const intersections =
    buildIntersections(
      vectors
    );

  console.log(
    "Total intersections:",
    intersections.length
  );

  const sentences =
    buildSentences(
      words
    );

  return {
    sentences,
    intersections
  };
}