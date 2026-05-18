import {
  PDFExtract
} from "pdf.js-extract";

const pdfExtract =
  new PDFExtract();

export async function textExtractor(
  filePath: string
) {

  const data =
    await pdfExtract.extract(
      filePath,
      {
        normalizeWhitespace: true
      }
    );

  const rawTexts: any[] = [];

  for (
    const page
    of data.pages
  ) {

    for (
      const item
      of page.content
    ) {

      rawTexts.push({
        item,
        page:
          page.info.num
      });
    }
  }

  return rawTexts;
}