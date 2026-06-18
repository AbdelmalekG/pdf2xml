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
): SentenceNode[] {

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

  let counter = 0;
  let sentenceId: string = "";

  for (
    const group
    of groups
  ) {

    if (
      group.length === 1
    ) {
      continue;
    }

    sentenceId = `sentence-${counter++}`;

    for (
      const word
      of group
    ) {



      word.consumed =
        true;

      word.consumedBy =
        sentenceId;
    }

    sentences.push(
      createSentenceNode(
        sentenceId,
        group
      )
    );
  }

  return sentences;
}
