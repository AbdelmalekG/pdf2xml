import {
  detectFileType
} from "@modules/detector";

import {
  extractObjects
} from "@modules/extractor";

import {
  analyzeObjects
} from "@modules/analyzer";

import {
  mapDocument,
  type MappedDocument
} from "@modules/mapper";

export async function pipeline(
  filePath: string,
  mimeType: string
): Promise<MappedDocument> {

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

  const mapped =
    await mapDocument(
      analyzed
    );

  return mapped;
}