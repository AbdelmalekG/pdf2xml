import {
  imageOcrExtractor,
  pdfOcrExtractor,
  textExtractor
} from "./extractors";

import {
  normalizePdfText,
  normalizeOcrText
} from "./normalizers";

import {
  type ExtractedText
} from "@modules/extractor";

import {
  type FileType
} from "@shared/types";

export async function extractText(
  filePath: string,
  fileType: FileType
): Promise<ExtractedText[]> {

  // PDF TEXT
  if (
    fileType === "pdf/text" ||
    fileType === "pdf/hybrid"
  ) {

    const rawTexts =
      await textExtractor(
        filePath
      );

    return normalizePdfText(
      rawTexts
    );
  }

  // IMAGE OCR
  if (
    fileType === "image"
  ) {

    const rawTexts =
      await imageOcrExtractor(
        filePath
      );

    return normalizeOcrText(
      rawTexts
    );
  }

  // PDF OCR
  if (
    fileType === "pdf/scanned"
  ) {

    const rawTexts =
      await pdfOcrExtractor(
        filePath
      );

    return normalizeOcrText(
      rawTexts
    );
  }

  return [];
}