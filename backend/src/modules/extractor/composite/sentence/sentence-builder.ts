import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

import type {
  SentenceNode
} from "./sentence.types";

import {
  sortWords
} from "./sentence-sorter";

import {
  groupSentenceWords
} from "./sentence-grouper";

import {
  createSentenceNode
} from "./sentence-node";

import {
  isExtractableWord
} from "./sentence.utils";

export function buildSentences(
  words: RawWordNode[]
): {
  sentences: SentenceNode[];
  wordSurvivors: RawWordNode[];
} {

  const sorted =
    sortWords(
      words.filter(
        isExtractableWord
      )
    );

  const groups =
    groupSentenceWords(
      sorted
    );

  const sentences:
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

      wordSurvivors.push(
        group[0]!
      );

      continue;
    }

    sentences.push(
      createSentenceNode(
        `sentence-${sentences.length}`,
        group
      )
    );
  }

  return {
    sentences,
    wordSurvivors
  };
}
