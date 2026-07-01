import type {
  RawWordNode
} from "../atomic/text";

import type {
  RawImageNode
} from "../atomic/image";

import type {
  RawVectorNode
} from "../atomic/vector";

import type {
  ExtractedObject
} from "../extractor.types";

import {
  normalizeWord
} from "./word-normalizer";

import {
  normalizeImage
} from "./image-normalizer";

import {
  normalizeVector
} from "./vector-normalizer";

import {
  sortObjects
} from "./object-sorter";

type NormalizableNode =
  | RawWordNode
  | RawImageNode
  | RawVectorNode;
  
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
    node.kind === "image"
  ) {
    return normalizeImage(
      node
    );
  }

  return normalizeVector(
    node
  );
}
