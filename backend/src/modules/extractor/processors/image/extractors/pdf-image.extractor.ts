import {
  PDFExtract
} from "pdf.js-extract";

import {
  isImageObject
} from "@modules/extractor/classifiers";

const pdfExtract =
  new PDFExtract();

export async function pdfImageExtractor(
  filePath: string
) {

  const data =
    await pdfExtract.extract(
      filePath,
      {
        includeImages: true
      }
    );

  const rawImages:
    any[] = [];

  for (
    const page
    of data.pages
  ) {

    if (!page.images) {
      continue;
    }

    for (
      const image
      of page.images
    ) {

      if (
        !isImageObject(image)
      ) {
        continue;
      }

      rawImages.push({
        image,

        page:
          page.info.num
      });
    }
  }

  return rawImages;
}