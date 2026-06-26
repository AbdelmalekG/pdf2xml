import type {
  BoxNode
} from "../../composite/box";

import type {
  RowNode
} from "./row.types";

import {
  belongsToRow
} from "./row.utils";

import { ROW_GAP_TOLERANCE } from "./row.constants";

export function buildRows(
  boxes: BoxNode[]
): RowNode[] {

  const rows:
    RowNode[] = [];

  const sortedBoxes =

    [...boxes].sort(

      (a, b) =>

        a.y - b.y ||
        a.x - b.x
    );

  for (
    const box
    of sortedBoxes
  ) {

    const existingRow =
      rows.find(row => {

        if (
          !belongsToRow(
            row.y + row.height / 2,
            box
          )
        ) {
          return false;
        }

        const lastBox =
          row.boxes
            .slice()
            .sort(
              (a, b) => a.x - b.x
            )
            .at(-1);

        if (!lastBox) {
          return false;
        }

        return (
          box.x - lastBox.endX
        ) <= ROW_GAP_TOLERANCE;
      });

    if (
      existingRow
    ) {

      existingRow.boxes.push(
        box
      );

      continue;
    }

    rows.push({

      id:
        `row-${rows.length}`,

      kind:
        "row",

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

  const validRows =
    rows.filter(
      row => row.boxes.length > 1
    );

  for (
    const row
    of validRows
  ) {

    row.boxes.sort(

      (a, b) =>

        a.x - b.x
    );

    const first =
      row.boxes[0]!;

    const last =
      row.boxes[
      row.boxes.length - 1
      ]!;

    row.x =
      first.x;

    row.y =
      Math.min(
        ...row.boxes.map(
          box => box.y
        )
      );

    row.width =
      (last.x + last.width) -
      first.x;

    row.height =
      Math.max(
        ...row.boxes.map(
          box => box.height
        )
      );

    for (
      const box
      of row.boxes
    ) {

      box.consumed =
        true;

      box.consumedBy =
        row.id;
    }
  }

  return validRows;
}