import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import type {
  RawImageNode
} from "../image.types";

export async function extractPdfImages(
  document: PdfDocumentContext
): Promise<RawImageNode[]> {

  const images: RawImageNode[] = [];

  let id = 0;

  for (
    const context
    of document.pages
  ) {

    const operatorList =
      await context.page.getOperatorList();

    const fnArray =
      operatorList.fnArray;

    const argsArray =
      operatorList.argsArray;

    for (
      let i = 0;
      i < fnArray.length;
      i++
    ) {

      const fn =
        fnArray[i];

      const args =
        argsArray[i];

      // paintImageXObject

      if (fn !== 85) {
        continue;
      }

      images.push({
        id:
          `image-${id++}`,

        kind: "image",

        x: 0,
        y: 0,

        width: 0,
        height: 0,

        page:
          context.pageNumber,

        buffer:
          Buffer.alloc(0)
      });
    }
  }

  return images;
}
