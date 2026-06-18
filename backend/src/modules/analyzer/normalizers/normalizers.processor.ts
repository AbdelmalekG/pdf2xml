import type {
  SentenceNode
} from "../composite";

import type {
  CellNode
} from "../structural";

import type {
  AnalyzedObject
} from "../analyzer.types";

import {
  normalizeSentence
} from "./sentence-normalizer";

import {
  normalizeCell
} from "./cell-normalizer";

import {
  sortObjects
} from "./object-sorter";

type NormalizableNode =
  | SentenceNode
  | CellNode;
  
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

  return normalizeCell(
    node
  );
}
