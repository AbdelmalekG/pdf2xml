import type {
  AnalyzedDocument,
  AnalyzedObject
} from "@modules/analyzer";

import type {
  TableCandidate
} from "../scorers";

export function mapFooter(
  document: AnalyzedDocument,
  summary: TableCandidate
) {

  const objects: AnalyzedObject[] = [];

  for (
    const page of document.pages
  ) {

    for (
      const object of page.content
    ) {

      if (
        object.page < summary.table.page
      ) {

        objects.push(
          object
        );

        continue;
      }

      if (
        object.page === summary.table.page &&
        object.y < summary.table.y
      ) {

        objects.push(
          object
        );

      }

    }

  }

  return {
    objects
  };

}