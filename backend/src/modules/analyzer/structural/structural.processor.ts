import type {
  RawImageNode,
  RawWordNode
} from "../../extractor/atomic";

import type {
  SentenceNode
} from "../composite/sentence";

import type {
  IntersectionNode
} from "../composite/intersection";

import {
  buildBoxes
} from "../composite/box";

export function processStructural(

  words:
    RawWordNode[],

  sentences:
    SentenceNode[],

  images:
    RawImageNode[],

  intersections:
    IntersectionNode[]

) {

  const boxes =
    buildBoxes(
      intersections,
      [
        ...words,
        ...images,
        ...sentences
      ]

    );

  return {
    boxes
  };
}