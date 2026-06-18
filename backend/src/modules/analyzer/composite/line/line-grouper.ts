import type {
  LineChildNode
} from "./line.types";

import {
  LINE_Y_THRESHOLD
} from "./line.constants";

import {
  areOnSameLine
} from "./line.utils";

export function groupLineChildren(
  children: LineChildNode[]
) {

  const groups:
    LineChildNode[][] = [];

  let currentGroup:
    LineChildNode[] = [];

  for (
    const child
    of children
  ) {

    const lineAnchor =
      currentGroup[0];

    if (!lineAnchor) {

      currentGroup.push(
        child
      );

      continue;
    }

    const sameLine =
      areOnSameLine(
        lineAnchor,
        child,
        LINE_Y_THRESHOLD
      );

    if (sameLine) {

      currentGroup.push(
        child
      );

      continue;
    }

    groups.push(
      currentGroup
    );

    currentGroup = [
      child
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
