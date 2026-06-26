import type {
  BoxNode
} from "../../composite/box";

import type {
  ColumnNode
} from "./column.types";

import {
  belongsToColumn
} from "./column.utils";

import { COLUMN_GAP_TOLERANCE } from "./column.constants";

export function buildColumns(
  boxes: BoxNode[]
): ColumnNode[] {

  const columns:
    ColumnNode[] = [];

  const sortedBoxes =

    [...boxes].sort(

      (a, b) =>

        a.x - b.x ||
        a.y - b.y
    );

  for (
    const box
    of sortedBoxes
  ) {

    const existingColumn =
      columns.find(column => {

        if (
          !belongsToColumn(
            column.x +
            column.width / 2,
            box
          )
        ) {
          return false;
        }

        const lastBox =
          column.boxes
            .slice()
            .sort(
              (a, b) => a.y - b.y
            )
            .at(-1);

        if (!lastBox) {
          return false;
        }

        return (
          box.y - lastBox.endY
        ) <= COLUMN_GAP_TOLERANCE;
      });

    if (
      existingColumn
    ) {

      existingColumn.boxes.push(
        box
      );



      continue;
    }

    const columnId =
      `column-${columns.length}`;

    columns.push({

      id:
        columnId,

      kind:
        "column",

      x:
        box.x,

      y:
        box.y,

      width:
        box.width,

      height:
        box.height,

      boxes: [
        box
      ],

      endX:
        box.x + box.width,

      endY:
        box.y + box.height,

      page:
        box.page
    });
  }

  const validColumns =
    columns.filter(
      column => column.boxes.length > 1
    );

  for (
    const column
    of validColumns
  ) {

    column.boxes.sort(

      (a, b) =>

        a.y - b.y
    );

    const first =
      column.boxes[0]!;

    const last =
      column.boxes[
      column.boxes.length - 1
      ]!;

    column.x =
      Math.min(
        ...column.boxes.map(
          box => box.x
        )
      );

    column.y =
      first.y;

    column.width =
      Math.max(
        ...column.boxes.map(
          box => box.width
        )
      );

    column.height =
      (last.y + last.height) -
      first.y;

    for (
      const box
      of column.boxes
    ) {

      box.consumed = true;

      box.consumedBy = column.id;
    }
  }

  return validColumns;
}