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

import {
  mapDocument
} from "@modules/mapper";

import {
  convertDocument
} from "@modules/converter";

export type PipelineResult = {

  analyzed: AnalyzedDocument;

  converted: string;
};

export async function pipeline(
  filePath: string,
  mimeType: string
): Promise<PipelineResult> {

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

  const converted =
    await convertDocument(
      mapped
    );

  return {
    analyzed,
    converted
  };
}