import {
  detectFileType
} from "@modules/detector";

import {
  extractObjects,
  type ExtractedObject
} from "@modules/extractor";

export async function pipeline(
  filePath: string,
  mimeType: string
): Promise<ExtractedObject[]> {

  // DETECTOR
  const detectedFile =
    await detectFileType(
      filePath,
      mimeType
    );

  // EXTRACTOR
  return extractObjects(
    detectedFile
  );
}