import {
  translateObject
} from "./object.translator";

import type {
  Table
} from "@modules/analyzer";

import type {
  XMLNode
} from "../xml/xml.types";

export function translateTable(
  table: Table
): XMLNode[] {

  return table.rows.flatMap(

    row =>

      row.boxes.map(

        box =>

          translateObject(
            box,
            true
          )
      )
  );
}