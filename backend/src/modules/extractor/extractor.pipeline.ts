import {
  readDocument
} from "./reader";

import {
  processAtomic
} from "./atomic";

import {
  normalizeObjects
} from "./normalizers";

import type {
  DetectedFile
} from "@shared/types";

import type {
  ExtractedDocument
} from "./extractor.types";

export async function runExtraction(
  detectedFile: DetectedFile
): Promise<ExtractedDocument> {

  const document =
    await readDocument(
      detectedFile
    );

  const atomicNodes =
    await processAtomic(
      document
    );

  const normalizedExtractedObjects =
    normalizeObjects(
      atomicNodes
    );

  const pages =
    document.pages.map(
      ({
        pageNumber,
        page
      }) => {

        const viewport =
          page.getViewport({
            scale: 1
          });

        return {

          id:
            `page-${pageNumber - 1}`,

          number:
            pageNumber,

          width:
            viewport.width,

          height:
            viewport.height,

          content:
            normalizedExtractedObjects.filter(
              object =>
                object.page ===
                pageNumber
            )
        };
      }
    );

  return {
    pages
  };
}