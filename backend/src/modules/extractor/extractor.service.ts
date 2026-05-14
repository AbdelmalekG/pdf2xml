import {
  extractorPipeline
} from "./extractor.pipeline";

import {
  type ExtractedObject
} from "./extractor.types";

import {
  type DetectedFile
} from "@modules/detector";

export async function extractObjects(
  detectedFile: DetectedFile
): Promise<ExtractedObject[]> {

  return extractorPipeline(
    detectedFile
  );
}