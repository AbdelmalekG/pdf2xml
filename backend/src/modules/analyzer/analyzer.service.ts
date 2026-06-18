import {
  runAnalysis
} from "./analyzer.pipeline";

import type {
  ExtractedDocument
} from "@extractor/extractor.types";

import type {
  AnalyzedDocument
} from "./analyzer.types";

export async function analyzeObjects(
  document: ExtractedDocument
): Promise<AnalyzedDocument> {

  return runAnalysis(
    document
  );
}