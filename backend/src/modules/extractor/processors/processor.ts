import {
  extractImage
} from "./image";

import {
  extractText
} from "./text";

import {
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

  // IMAGES
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