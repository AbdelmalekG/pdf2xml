import {
  processFile
} from "./processors";

import {
  type ExtractedObject
} from "./extractor.types";

import {
  type DetectedFile
} from "@modules/detector";

export async function extractorPipeline(
  detectedFile: DetectedFile
): Promise<ExtractedObject[]> {

  return processFile(
    detectedFile
  );
}