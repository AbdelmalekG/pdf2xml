import {
  runExtraction
} from "./extractor.pipeline";

import type {
  ExtractedDocument
} from "./extractor.types";

import type {
  DetectedFile
} from "@shared/types";

export async function extractObjects(
  detectedFile: DetectedFile
): Promise<ExtractedDocument> {

  return runExtraction(
    detectedFile
  );
}