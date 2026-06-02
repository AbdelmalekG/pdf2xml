import type {
  SentenceNode
} from "../sentence";

import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

import type {
  LineChildNode,
  LineNode
} from "./line.types";

import {
  sortLineChildren
} from "./line-sorter";

import {
  groupLineChildren
} from "./line-grouper";

import {
  createLineNode
} from "./line-node";

export function buildLines(
  children: LineChildNode[]
): {
  lines: LineNode[];
  wordSurvivors: RawWordNode[];
  sentenceSurvivors: SentenceNode[];
} {

  const sorted =
    sortLineChildren(
      children
    );

  const groups =
    groupLineChildren(
      sorted
    );

  const lines:
    LineNode[] = [];

  const sentenceSurvivors:
    SentenceNode[] = [];

  const wordSurvivors:
    RawWordNode[] = [];

  for (
    const group
    of groups
  ) {

    if (
      group.length === 1
    ) {

      const child =
        group[0]!;

      if (
        child.kind === "word"
      ) {
        wordSurvivors.push(
          child
        );
      } else {
        sentenceSurvivors.push(
          child
        );
      }

      continue;
    }

    lines.push(
      createLineNode(
        `line-${lines.length}`,
        group
      )
    );
  }

  return {
    lines,
    wordSurvivors,
    sentenceSurvivors
  };
}
