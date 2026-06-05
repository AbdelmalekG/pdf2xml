import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import {
  extractPdfVectors
} from "./extractors";

import type {
  RawVectorNode
} from "./vector.types";

export async function extractVector(
  document: PdfDocumentContext
): Promise<RawVectorNode[]> {

  return extractPdfVectors(
    document
  );
}