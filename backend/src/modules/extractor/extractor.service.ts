import {
  extractorPipeline
} from "./extractor.pipeline";

import {
  type ExtractedObject
} from "./extractor.types";

import {
  type DetectedFile
} from "@shared/types";

export async function extractObjects(
  detectedFile: DetectedFile
): Promise<ExtractedObject[]> {

  return extractorPipeline(
    detectedFile
  );
}