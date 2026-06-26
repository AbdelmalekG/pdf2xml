import type {
  BoxNode
} from "../../composite/box";

const COLUMN_TOLERANCE = 2;

export function getBoxCenterX(
  box: BoxNode
) {

  return (
    box.x +
    box.width / 2
  );
}

export function getVerticalGap(
  topBox: BoxNode,
  bottomBox: BoxNode
) {

  return (
    bottomBox.y -
    topBox.endY
  );
}

export function belongsToColumn(
  columnCenterX: number,
  box: BoxNode
) {

  return Math.abs(
    getBoxCenterX(box) -
    columnCenterX
  ) <= COLUMN_TOLERANCE;
}