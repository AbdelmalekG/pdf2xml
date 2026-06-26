import type {
  BoxNode
} from "../../composite/box";
import type { BaseStructuralNode } from "../structural.types";

export type ColumnNode =
  BaseStructuralNode & {

    kind: "column";

    x: number;

    y: number;

    width: number;

    height: number;

    boxes: BoxNode[];

    endX: number;
    endY: number;

    page: number;
  };