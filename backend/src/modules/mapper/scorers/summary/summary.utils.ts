import type {
  Row,
  Table
} from "@modules/analyzer";

import {
  isNumericText
} from "../scorer.utils";

export function rowContainsOnlyNumbers(
  row: Row
): boolean {

  for (const box of row.boxes) {

    for (const child of box.children) {

      if (!("text" in child)) {
        continue;
      }

      if (!isNumericText(child.text)) {
        return false;
      }
    }
  }

  return true;
}

export function headerContainsSummaryKeyword(
  table: Table
) {

  if (
    table.rows.length === 0
  ) {

    return false;

  }

  const keywords = [

    "total",
    "totaux",
    "montant",
    "tva",
    "ht",
    "ttc",
    "net",
    "solde",
    "reduction",
    "réduction"

  ];

  return table.rows.at(-1)!.boxes.some(

    box =>

      box.children.some(

        child => {

          if (
            !("text" in child)
          ) {

            return false;

          }

          const text =
            child.text.toLowerCase();

          return keywords.some(

            keyword =>
              text.includes(
                keyword
              )
          );
        }
      )
  );
}