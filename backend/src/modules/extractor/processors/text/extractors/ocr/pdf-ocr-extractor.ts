import {
  imageOcrExtractor
} from "./image-ocr-extractor";

import {
  renderPdfPages
} from "@/shared/utils/pdf-rendering";

export async function pdfOcrExtractor(
  filePath: string
) {

  const pagePaths =
    await renderPdfPages(
      filePath
    );

  const rawTexts:
    any[] = [];

  let pageNumber = 1;

  for (
    const pagePath
    of pagePaths
  ) {

    const pageTexts =
      await imageOcrExtractor(
        pagePath
      );

    for (
      const pageText
      of pageTexts
    ) {

      rawTexts.push({

        ...pageText,

        page:
          pageNumber
      });
    }

    pageNumber++;
  }

  return rawTexts;
}