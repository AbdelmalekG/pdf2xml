import type {
  SentenceNode
} from "../composite";

import type {
  BoxNode
} from "../composite";

import type {
  AnalyzedObject
} from "../analyzer.types";

import {
  normalizeSentence
} from "./sentence-normalizer";

import {
  normalizeBox
} from "./box-normalizer";

import {
  sortObjects
} from "./object-sorter";

type NormalizableNode =
  | SentenceNode
  | BoxNode;
  
export function normalizeObjects(
  nodes: NormalizableNode[]
): AnalyzedObject[] {

  const objects =
    nodes.map(
      normalizeObject
    );

  return sortObjects(
    objects
  );
}

function normalizeObject(
  node: NormalizableNode
): AnalyzedObject {

  if (
    node.kind === "sentence"
  ) {
    return normalizeSentence(
      node
    );
  }

  return normalizeBox(
    node
  );
}
