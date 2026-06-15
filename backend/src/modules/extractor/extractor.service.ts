import {
  extractorPipeline
} from "./extractor.pipeline";

import type {
  ExtractedObject
} from "./extractor.types";

import type {
  DetectedFile
} from "@shared/types";

export async function extractObjects(
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

  return extractorPipeline(
    detectedFile
  );
}