import path from "path";

import fs from "fs/promises";

import {
  pdf
} from "pdf-to-img";

import {
  imageOcrExtractor
} from "./image-ocr-extractor";

export async function pdfOcrExtractor(
  filePath: string
) {

  const document =
    await pdf(
      filePath,
      {
        scale: 3
      }
    );

  const outputDir =
    path.join(
      "src",
      "uploads",
      path.basename(filePath)
    );

  await fs.mkdir(
    outputDir,
    {
      recursive: true
    }
  );

  const rawTexts:
    any[] = [];

  let page = 1;

  for await (
    const imageBuffer
    of document
  ) {

    const imagePath =
      path.join(
        outputDir,
        `page-${page}.png`
      );

    await fs.writeFile(
      imagePath,
      imageBuffer
    );

    const result =
      await imageOcrExtractor(
        imagePath
      );

    if (result[0] !== undefined) {
      rawTexts.push({
        result:
          result[0].result,
        page
      });
    }
    else {
      throw new Error(
        `OCR failed for page ${page}`
      );
    }

    page++;
  }

  return rawTexts;
}