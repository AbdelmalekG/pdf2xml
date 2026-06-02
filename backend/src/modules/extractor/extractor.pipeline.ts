import {
  processExtractor
} from "./extractor.processor";

import type {
  ExtractedObject
} from "./extractor.types";

import type {
  DetectedFile
} from "@shared/types";

export async function extractorPipeline(
  detectedFile: DetectedFile
): Promise<ExtractedObject[]> {

  return processExtractor(
    detectedFile
  );
}