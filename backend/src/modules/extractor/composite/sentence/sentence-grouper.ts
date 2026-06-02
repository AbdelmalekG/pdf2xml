import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

import {
  SENTENCE_Y_THRESHOLD
} from "./sentence.constants";

import {
  calculateDynamicSpaceWidthRange,
  calculateWordGap,
  areWordsOnSameLine,
  isExtractableWord
} from "./sentence.utils";

export function groupSentenceWords(
  words: RawWordNode[]
) {

  const groups:
    RawWordNode[][] = [];

  let currentGroup:
    RawWordNode[] = [];

  for (
    const word
    of words.filter(
      isExtractableWord
    )
  ) {

    const previous =
      currentGroup[
        currentGroup.length - 1
      ];

    if (!previous) {

      currentGroup.push(
        word
      );

      continue;
    }

    const sameLine =
      areWordsOnSameLine(
        previous,
        word,
        SENTENCE_Y_THRESHOLD
      );

    const gap =
      calculateWordGap(
        previous,
        word
      );

    const dynamicSpace =
      calculateDynamicSpaceWidthRange(
        previous
      );

    const sameSentence =
      gap >= dynamicSpace.min &&
      gap <= dynamicSpace.max;

    if (
      sameLine &&
      sameSentence
    ) {

      currentGroup.push(
        word
      );

      continue;
    }

    groups.push(
      currentGroup
    );

    currentGroup = [
      word
    ];
  }

  if (
    currentGroup.length
  ) {

    groups.push(
      currentGroup
    );
  }

  return groups;
}
