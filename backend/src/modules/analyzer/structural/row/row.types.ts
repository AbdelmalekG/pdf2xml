import type {
  BoxNode
} from "../../composite/box";

import type {
  BaseStructuralNode,
  StructuralNodeKind
} from "../structural.types";

export type RowNode =
  BaseStructuralNode & {

    kind:
      typeof StructuralNodeKind.row;

    x: number;
    y: number;

    width: number;
    height: number;

    boxes: BoxNode[];

    endX: number;
    endY: number;

    page: number;
  };