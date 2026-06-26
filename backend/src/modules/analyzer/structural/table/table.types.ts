import type { RowNode } from "../row";

import type { ColumnNode } from "../column";

import type {
  BaseStructuralNode,
  StructuralNodeKind
} from "../structural.types";

export type TableNode =
  BaseStructuralNode & {

    kind:
      typeof StructuralNodeKind.table;

    x: number;
    y: number;

    width: number;
    height: number;

    rows: RowNode[];
    columns: ColumnNode[];

    page: number;
  };