import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import {
  extractRawTextItems
} from "./text-extractor";

import {
  normalizeTextItems
} from "@modules/extractor/normalizers";

export async function extractText(
  document: PdfDocumentContext
) {

  const rawItems =
    await extractRawTextItems(
      document
    );

  return normalizeTextItems(
    rawItems
  );
}