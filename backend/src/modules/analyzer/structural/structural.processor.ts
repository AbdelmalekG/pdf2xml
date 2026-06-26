import {
  buildRows
} from "./row";

import {
  buildColumns
} from "./column";

import {
  buildTables
} from "./table";

import type {
  BoxNode
} from "../composite/box";

export function processStructural(
  boxes: BoxNode[]
) {

  const rows =
    buildRows(
      boxes
    );

  const columns =
    buildColumns(
      boxes
    );

  const tables =
    buildTables(

      rows,

      columns
    );

  return {
    rows,
    columns,
    tables
  };
}