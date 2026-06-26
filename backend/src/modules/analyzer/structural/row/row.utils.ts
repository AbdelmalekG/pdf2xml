import type {
  BoxNode
} from "../../composite/box";

import {
  ROW_ALIGNMENT_TOLERANCE
} from "./row.constants";

export function getBoxCenterY(
  box: BoxNode
) {
  return box.y + box.height / 2;
}

export function getHorizontalGap(
  leftBox: BoxNode,
  rightBox: BoxNode
) {

  return (
    rightBox.x -
    leftBox.endX
  );
}

export function belongsToRow(

  rowCenterY: number,

  box: BoxNode

) {

  return (
    Math.abs(
      getBoxCenterY(box) -
      rowCenterY
    ) <= ROW_ALIGNMENT_TOLERANCE
  );
}