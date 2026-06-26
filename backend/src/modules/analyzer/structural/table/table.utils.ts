import type { RowNode } from "../row";

import {
  TABLE_GAP_TOLERANCE
} from "./table.constants";

export function belongsToTable(

  lastRow: RowNode,

  nextRow: RowNode

) {

  return (

    nextRow.y -
    lastRow.endY

  ) <= TABLE_GAP_TOLERANCE;
}