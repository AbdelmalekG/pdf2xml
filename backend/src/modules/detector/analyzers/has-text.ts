import {
  pdfToText
} from "pdf-ts";

import {
  loadFile
} from "@shared/utils/loaders";

export async function hasText(
  filePath: string
): Promise<boolean> {

  const buffer =
    loadFile(
      filePath
    );

  const extractedText =
    await pdfToText(
      buffer
    );

  return (
    extractedText
      .trim()
      .length > 0
  );
}