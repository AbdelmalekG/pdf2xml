import {
  extractImage,
  extractText,
  type ExtractedObject
} from "@modules/extractor";

import {
  type DetectedFile
} from "@shared/types";

export async function processFile(
  detectedFile: DetectedFile
): Promise<ExtractedObject[]> {

  const {
    filePath,
    fileType
  } = detectedFile;

  const objects:
    ExtractedObject[] = [];

  // TEXTS
  const texts =
    await extractText(
      filePath,
      fileType
    );

  objects.push(
    ...texts
  );

  // EMBEDDED IMAGES
  if (
    fileType === "pdf/hybrid"
  ) {

    const images =
      await extractImage(
        filePath
      );

    objects.push(
      ...images
    );
  }

  return objects;
}