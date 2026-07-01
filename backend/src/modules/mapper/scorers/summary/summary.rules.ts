import type {
  TableRule
} from "../scorer.types";

import {
  rowContainsOnlyNumbers,
  headerContainsSummaryKeyword
} from "./summary.utils";

export const SummaryRules: TableRule[] = [

  {
    reason:
      "Exactly one data row",

    weight:
      40,

    test:
      table =>
        table.rows.length === 2
  },

  {
    reason:
      "Data row contains only numbers",

    weight:
      60,

    test:
      table =>

        table.rows.length >= 2 &&

        rowContainsOnlyNumbers(

          table.rows[0]!

        )
  },

  {
    reason:
      "Header contains summary keywords",

    weight:
      50,

    test:
      table =>
        headerContainsSummaryKeyword(
          table
        )
  },

  {
    reason:
      "Appears after another table",

    weight:
      20,

    test:
      (
        table,
        tables
      ) =>

        tables.some(

          other =>

            other !== table &&

            (
              other.page < table.page ||

              (
                other.page === table.page &&
                other.y < table.y
              )
            )

        )
  }

];