import type {
  TableRule
} from "../scorer.types";

import {
  isNumericText
} from "../scorer.utils";

import {
  headerContainsDetailKeyword
} from "./detail.utils";

export const DetailRules: TableRule[] = [

  {
    reason:
      "Contains many columns",

    weight:
      30,

    test:
      table =>
        table.columns.length >= 5
  },
  {
    reason:
      "Contains a numeric column",

    weight:
      40,

    test:
      table =>

        table.columns.some(
          column => {

            const dataBoxes =
              column.boxes.slice(0, -1);

            return (
              dataBoxes.length > 0 &&

              dataBoxes.every(
                box =>
                  box.children.every(
                    child => {

                      if (!("text" in child)) {
                        return true;
                      }

                      return isNumericText(
                        child.text
                      );
                    }
                  )
              )
            );
          }
        )
  },
  {
    reason:
      "Header contains detail keywords",

    weight:
      40,

    test:
      table =>
        headerContainsDetailKeyword(
          table
        )
  },
  {
    reason:
      "Not the last table",

    weight:
      20,

    test: (
      table,
      tables
    ) => {

      return tables.some(
        other =>
          other !== table &&

          (
            other.page > table.page ||

            (
              other.page === table.page &&
              other.y > table.y
            )
          )
      );
    }
  }
];