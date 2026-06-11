import {
  readDocument
} from "./reader";

import {
  processAtomic
} from "./atomic";

import {
  processComposite
} from "./composite";

import {
  processStructural
} from "./structural";

import {
  normalizeObjects
} from "./normalizers";

import {
  type DetectedFile
} from "@shared/types";

import type {
  RawWordNode,
  RawImageNode,
  RawVectorNode
} from "./atomic";

export async function processExtractor(
  detectedFile: DetectedFile
) {

  const document =
    await readDocument(
      detectedFile
    );

  const atomicNodes =
    await processAtomic(
      document
    );

  const words =
    atomicNodes.filter(
      (
        node
      ): node is RawWordNode =>
        node.kind === "word"
    );

  const images =
    atomicNodes.filter(
      (
        node
      ): node is RawImageNode =>

        node.kind === "image"
    );

  const vectors =
    atomicNodes.filter(
      (
        node
      ): node is RawVectorNode =>
        node.kind === "vector"
    );

  const compositeResult =
    await processComposite(
      atomicNodes
    );

  const structuralResult =
    await processStructural(

      words,

      compositeResult.sentences,

      images,

      compositeResult.intersections
    );

  const standaloneWords =
    words.filter(
      word => !word.consumed
    );

  const standaloneSentences =
    compositeResult.sentences.filter(
      sentence => !sentence.consumed
    );

  const standaloneImages =
    images.filter(
      image => !image.consumed
    );

  const standaloneVectors =
    vectors.filter(
      vector => !vector.consumed
    );

  const finalNodes = [

    ...standaloneWords,

    ...standaloneSentences,

    ...structuralResult.cells,

    ...standaloneImages,

    ...standaloneVectors
  ];

  return normalizeObjects(
    finalNodes
  );
}
