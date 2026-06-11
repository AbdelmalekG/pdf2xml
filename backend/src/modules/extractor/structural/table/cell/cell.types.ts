import type {
  CompositeNodeKind,
} from "@modules/extractor";

import type {
  RawWordNode,
  RawImageNode
} from "@modules/extractor/atomic";

import type {
  SentenceNode
} from "@modules/extractor/composite/sentence";

export type CellContentNode =
  | RawWordNode
  | RawImageNode
  | SentenceNode;

export interface CellNode {

  id: string;

  kind: typeof CompositeNodeKind.cell;

  x: number;
  y: number;

  endX: number;
  endY: number;

  width: number;
  height: number;

  children:
    CellContentNode[];

  page: number;
}