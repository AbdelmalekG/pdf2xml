import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import {
  extractRawWordItems
} from "./extractors/pdf-word-extractor";

import {
  normalizeTextItems
} from "@modules/extractor/normalizers";

export async function extractWord(
  document: PdfDocumentContext
) {

  const rawItems =
    await extractRawWordItems(
      document
    );

  return normalizeTextItems(
    rawItems
  );
}