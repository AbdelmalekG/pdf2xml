import type {
  RawImageNode
} from "../atomic/image/image.types";

import type {
  RawWordNode
} from "../atomic/text";

import type {
  RawVectorNode
} from "../atomic/vector";

import {
  normalizeVector
} from "./vector-normalizer";

import type {
  LineNode
} from "../composite/line";

import type {
  SentenceNode
} from "../composite/sentence";

import type {
  ExtractedObject
} from "../extractor.types";

import {
  normalizeImage
} from "./image-normalizer";

import {
  normalizeLine
} from "./line-normalizer";

import {
  sortObjects
} from "./object-sorter";

import {
  normalizeSentence
} from "./sentence-normalizer";

import {
  normalizeWord
} from "./word-normalizer";

import type {
  CellNode
} from "../structural";

import {
  normalizeCell
} from "./cell-normalizer";

type NormalizableNode =
  | RawWordNode
  | RawImageNode
  | RawVectorNode
  | SentenceNode
  | CellNode
  | LineNode;

export function normalizeObjects(
  nodes: NormalizableNode[]
): ExtractedObject[] {

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
): ExtractedObject {

  if (
    node.kind === "word"
  ) {
    return normalizeWord(
      node
    );
  }

  if (
    node.kind === "sentence"
  ) {
    return normalizeSentence(
      node
    );
  }

  if (
    node.kind === "line"
  ) {
    return normalizeLine(
      node
    );
  }

  if (
    node.kind === "image"
  ) {
    return normalizeImage(
      node
    );
  }

  if (
    node.kind === "vector"
  ) {
    return normalizeVector(
      node
    );
  }

  return normalizeCell(
    node
  );
}
