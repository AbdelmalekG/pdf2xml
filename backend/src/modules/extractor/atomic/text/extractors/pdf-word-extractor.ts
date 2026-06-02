import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import type {
  RawWordNode
} from "../text.types";

export async function pdfWordExtractor(
  context: PdfDocumentContext
): Promise<RawWordNode[]> {

  const words: RawWordNode[] = [];

  let id = 0;

  for (
    const {
      page,
      pageNumber
    }
    of context.pages
  ) {

    const textContent =
      await page.getTextContent();

    const viewport =
      page.getViewport({
        scale: 1
      });

    for (
      const item
      of textContent.items
    ) {

      if (
        !("str" in item)
      ) {
        continue;
      }

      const text =
        item.str?.trim();

      if (!text) {
        continue;
      }

      const x =
        item.transform[4];

      const pdfY =
        item.transform[5];

      const y =
        viewport.height
        - pdfY;

      const width =
        item.width;

      const height =
        item.height;

      words.push({

        id:
          `word-${id++}`,

        kind: "word",

        text,

        x,
        y,

        width,
        height,

        endX:
          x + width,

        endY:
          y + height,

        page:
          pageNumber,

        transform:
          item.transform,

        direction:
          item.dir as "ltr" | "rtl" | "ttb" | "btt",

      });
    }
  }

  return words;
}
