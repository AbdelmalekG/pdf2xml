import type {
  SentenceNode
} from "../composite";

import type {
  BoxNode
} from "../composite";

import type {
  RowNode
} from "../structural/row";

import type {
  ColumnNode
} from "../structural/column";

import type {
  TableNode
} from "../structural/table";

import type {
  AnalyzedObject
} from "../analyzer.types";

import {
  normalizeSentence
} from "./sentence-normalizer";

import {
  normalizeBox
} from "./box-normalizer";

import {
  normalizeRow
} from "./row-normalizer";

import {
  normalizeColumn
} from "./column-normalizer";

import {
  normalizeTable
} from "./table-normalizer";

import {
  sortObjects
} from "./object-sorter";

type NormalizableNode =
  | SentenceNode
  | BoxNode
  | RowNode
  | ColumnNode
  | TableNode;

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

  if (
    node.kind === "box"
  ) {
    return normalizeBox(
      node
    );
  }

  if (
    node.kind === "row"
  ) {
    return normalizeRow(
      node
    );
  }

  if (
    node.kind === "column"
  ) {
    return normalizeColumn(
      node
    );
  }

  return normalizeTable(
    node
  );
}
