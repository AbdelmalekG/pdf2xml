import {
  pdfImageExtractor
} from "./extractors";

import {
  normalizePdfImage
} from "./normalizers";

import {
  type ExtractedImage
} from "@modules/extractor";

export async function extractImage(
  filePath: string
): Promise<ExtractedImage[]> {

  const rawImages =
    await pdfImageExtractor(
      filePath
    );

  return normalizePdfImage(
    rawImages
  );
}