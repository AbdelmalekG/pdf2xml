import {
  detectorPipeline
} from "./detector.pipeline";

import {
  type DetectedFile
} from "@shared/types";

export async function detectFileType(
  filePath: string,
  mimeType: string
): Promise<DetectedFile> {

  return detectorPipeline(
    filePath,
    mimeType
  );
}