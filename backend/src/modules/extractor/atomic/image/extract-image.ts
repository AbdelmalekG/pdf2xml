import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import {
  extractPdfImages
} from "./extractors";

import type {
  RawImageNode
} from "./image.types"

export async function extractImage(
  context: PdfDocumentContext
): Promise<RawImageNode[]> {

  return extractPdfImages(
    context
  );
}