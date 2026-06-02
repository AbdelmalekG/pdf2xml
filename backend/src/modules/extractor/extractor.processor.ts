import {
  readDocument
} from "./reader/reader.processor";

import {
  processAtomic
} from "./atomic/atomic.processor";

import {
  processComposite
} from "./composite/composite.processor";

import {
  normalizeObjects
} from "./normalizers/normalizers.processor";

import {
  type DetectedFile
} from "@shared/types";

import type {
  RawImageNode
} from "./atomic/image/image.types";

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

  const compositeResult =
    await processComposite(
      atomicNodes
    );

  const imageSurvivors =
    atomicNodes.filter(
      (
        node
      ): node is RawImageNode =>

        node.kind === "image"
    );

  const finalNodes = [

    ...compositeResult.wordSurvivors,

    ...compositeResult.sentenceSurvivors,

    ...compositeResult.lines,

    ...imageSurvivors
  ];

  return normalizeObjects(
    finalNodes
  );
}
