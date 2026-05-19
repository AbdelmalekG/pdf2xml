import {
  pdfImageExtractor
} from "./extractors";

import {
  normalizePdfImage
} from "./normalizers";

export async function extractImage(
  filePath: string
) {

  const rawImages =
    await pdfImageExtractor(
      filePath
    );

  return normalizePdfImage(
    rawImages
  );
}