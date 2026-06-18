import type {
  BaseCompositeNode,
  CompositeNodeKind
} from "../composite.types";

import type {
  RawWordNode
} from "@modules/extractor/atomic/text";

export type SentenceNode =
  BaseCompositeNode & {

    kind:
      typeof CompositeNodeKind.sentence;

    text: string;

    words:
      RawWordNode[];

    x: number;
    y: number;

    width: number;
    height: number;

    endX: number;
    endY: number;

    page: number;
  };