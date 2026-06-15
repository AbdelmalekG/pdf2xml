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
): Promise<{
  pages: {
    id: string;
    number: number;
    width: number;
    height: number;
    content: ExtractedObject[];
  }[];
}> {

  return processExtractor(
    detectedFile
  );
}