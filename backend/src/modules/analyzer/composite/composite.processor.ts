import {
  buildSentences
} from "./sentence";

import {
  buildIntersections
} from "./intersection";

import {
  buildBoxes
} from "./box";

import {
  recoverCurveLineVectors,
  mergeVectors
} from "../transforms";

import type {
  BaseAtomicNode,
  RawWordNode
} from "@modules/extractor/atomic";

import type {
  RawVectorNode,
  RawVectorLineNode
} from "@modules/extractor/atomic/vector";

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

  const lineVectors =
    vectors.filter(
      (
        vector
      ): vector is RawVectorLineNode =>

        vector.vectorKind === "line"
    );

  const recoveredVectors =
    recoverCurveLineVectors(
      vectors
    );

  const mergedVectors =
    mergeVectors([
      ...lineVectors,
      ...recoveredVectors
    ]);

  const intersections =
    buildIntersections(
      mergedVectors
    );

  const sentences =
    buildSentences(
      words
    );

  const boxes =
    buildBoxes(
      intersections,
      [
        ...words,
        ...sentences
      ]
    );

  return {
    sentences,
    intersections,
    boxes
  };
}