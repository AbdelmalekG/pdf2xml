import {
  detectFileType
} from "@modules/detector";

import {
  extractObjects
} from "@modules/extractor";

import {
  analyzeObjects,
  type AnalyzedDocument
} from "@modules/analyzer";

export async function pipeline(
  filePath: string,
  mimeType: string
): Promise<AnalyzedDocument> {

  const detected =
    await detectFileType(
      filePath,
      mimeType
    );

  const extracted =
    await extractObjects(
      detected
    );

  const analyzed =
    await analyzeObjects(
      extracted
    );

  return analyzed;
}