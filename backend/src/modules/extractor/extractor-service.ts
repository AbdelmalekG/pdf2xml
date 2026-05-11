import fs from "fs";

import * as pdfjs
  from "pdfjs-dist/legacy/build/pdf.mjs";

import { detectFileType } from "@/modules/detector";

import { isTextObject } from "./classifiers";

import { extractText } from "./processors";

import { type ExtractedObject } from "./extractor.types";

export async function extractObjects(
  filePath: string,
  mimeType: string
): Promise<ExtractedObject[]> {

  const detectedType =
    await detectFileType(
      filePath,
      mimeType
    );

  if (
    detectedType !== "pdf/text" && detectedType !== "pdf/hybrid"
  ) {

    throw new Error(
      "Only text PDFs are supported currently"
    );
  }

  const data =
    new Uint8Array(
      fs.readFileSync(filePath)
    );

  const pdf =
    await pdfjs.getDocument({
      data
    }).promise;

  const objects:
    ExtractedObject[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page =
      await pdf.getPage(
        pageNumber
      );

    const viewport =
      page.getViewport({
        scale: 1
      });

    const textContent =
      await page.getTextContent();

    for (
      const item
      of textContent.items
    ) {

      if (
        isTextObject(item)
      ) {

        objects.push(
          extractText(
            item,
            pageNumber,
            viewport.width
          )
        );
      }
    }
  }

  return objects;
}