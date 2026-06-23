import type {
  CompositeNodeKind,
} from "@modules/analyzer/composite";

import type {
  RawWordNode,
  RawImageNode
} from "@modules/extractor/atomic";

import type {
  SentenceNode
} from "@modules/analyzer/composite/sentence";

export type BoxContentNode =
  | RawWordNode
  | RawImageNode
  | SentenceNode;

export interface BoxNode {

  id: string;

  kind: typeof CompositeNodeKind.box;

  x: number;
  y: number;

  endX: number;
  endY: number;

  width: number;
  height: number;

  children:
    BoxContentNode[];

  page: number;
}