import type {
  AnalyzedDocument,
  AnalyzedObject,
  Table
} from "@modules/analyzer";


export function mapHeader(
  document: AnalyzedDocument,
  detail: Table
) {

  const objects: AnalyzedObject[] = [];

  for (
    const page of document.pages
  ) {

    for (
      const object of page.content
    ) {

      const headerRow =
        detail.rows.at(-1);

      if (!headerRow) {

        return {
          objects: []
        };

      }

      const splitY =
        headerRow.y + headerRow.height;

      if (
        object.page > detail.page
      ) {

        objects.push(
          object
        );

        continue;
      }

      if (
        object.page === detail.page &&
        object.y > splitY
      ) {

        objects.push(
          object
        );
      }
    }
  }

  const headerRow =
    detail.rows.at(-1);

  if (headerRow) {

    objects.push(
      headerRow
    );

  }

  return {
    objects
  };
}