import type {
  RowNode
} from "../row";

import type {
  ColumnNode
} from "../column";

import type {
  TableNode
} from "./table.types";

import {
  belongsToTable
} from "./table.utils";

function createTable(

  rows: RowNode[],

  columns: ColumnNode[],

  index: number

): TableNode | null {

  const id =
    `table-${index}`;

  const tableColumns =
    columns.filter(
      column =>
        column.boxes.some(
          columnBox =>
            rows.some(
              row =>
                row.boxes.includes(
                  columnBox
                )
            )
        )
    );

  rows.forEach(
    row => {
      row.consumed = true;
      row.consumedBy = id;
    }
  );

  tableColumns.forEach(
    column => {
      column.consumed = true;
      column.consumedBy = id;
    }
  );

  if (

    rows.length < 2 ||

    tableColumns.length < 2

  ) {

    rows.forEach(row => {
      row.consumed = false;
      row.consumedBy = "";
    });

    tableColumns.forEach(column => {
      column.consumed = false;
      column.consumedBy = "";
    });

    return null;
  }

  return {
    id,

    kind: "table",

    x:
      Math.min(
        ...tableColumns.map(
          column => column.x
        )
      ),

    y:
      rows[0]!.y,

    width:
      Math.max(
        ...tableColumns.map(
          column => column.endX
        )
      )
      -
      Math.min(
        ...tableColumns.map(
          column => column.x
        )
      ),

    height:
      rows.at(-1)!.endY -
      rows[0]!.y,

    rows,

    columns: tableColumns,

    page:
      rows[0]!.page
  };
}

export function buildTables(
  rows: RowNode[],
  columns: ColumnNode[]
): TableNode[] {

  const tables: TableNode[] = [];

  const sortedRows =
    [...rows].sort(
      (a, b) =>
        a.page - b.page ||
        a.y - b.y
    );

  let currentRows: RowNode[] = [];

  for (
    const row
    of sortedRows
  ) {

    if (
      currentRows.length === 0
    ) {

      currentRows.push(row);

      continue;
    }

    const lastRow =
      currentRows.at(-1)!;

    if (
      belongsToTable(
        lastRow,
        row
      )
    ) {

      currentRows.push(row);

      continue;
    }

    const table =
      createTable(
        currentRows,
        columns,
        tables.length
      );

    if (
      table
    ) {
      tables.push(table);
    }

    currentRows = [
      row
    ];
  }

  if (
    currentRows.length
  ) {

    const table =
      createTable(
        currentRows,
        columns,
        tables.length
      );

    if (
      table
    ) {
      tables.push(table);
    }
  }

  return tables;
}