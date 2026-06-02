import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

export async function extractRawTextItems(
  document: PdfDocumentContext
) {

  const items: any[] = [];

  for (
    const pageContext
    of document.pages
  ) {

    const textContent =
      await pageContext.page.getTextContent();

    for (
      const item
      of textContent.items
    ) {

      items.push({

        page:
          pageContext.pageNumber,

        item
      });
    }
  }

  return items;
}