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
  buildCells
} from "./table/cell";

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

  const cells =
    buildCells(
      intersections,
      [
        ...words,
        ...images,
        ...sentences
      ]

    );

  return {
    cells
  };
}