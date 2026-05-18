import {
  loadPdf
} from "@/shared/utils/loaders";

import {
  isTextObject
} from "@modules/extractor/classifiers";

export async function textExtractor(
  filePath: string
) {

  const pdf =
    await loadPdf(filePath);

  const rawTexts: any[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page =
      await pdf.getPage(
        pageNumber
      );

    const textContent =
      await page.getTextContent();

    for (
      const item
      of textContent.items
    ) {

      if (
        !isTextObject(item)
      ) {
        continue;
      }

      rawTexts.push({
        item,
        page: pageNumber
      });
    }
  }

  return rawTexts;
}