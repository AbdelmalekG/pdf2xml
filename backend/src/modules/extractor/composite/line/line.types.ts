import type {
  BaseCompositeNode,
  CompositeNodeKind
} from "../composite.types";

import type {
  SentenceNode
} from "../sentence";

import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

export type LineChildNode =
  | SentenceNode
  | RawWordNode;

export type LineNode =
  BaseCompositeNode & {

    kind:
      typeof CompositeNodeKind.line;

    children:
      LineChildNode[];

    x: number;
    y: number;

    width: number;
    height: number;

    endX: number;
    endY: number;

    page: number;
  };
