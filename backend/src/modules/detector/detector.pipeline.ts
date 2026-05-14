import {
  type FileType
} from "@shared/types";

import {
  type DetectedFile
} from "./detector.types";

import {
  fileValidator
} from "./validator";

import {
  hasText,
  hasImage
} from "./analyzers";

export async function detectorPipeline(
  filePath: string,
  mimeType: string
): Promise<DetectedFile> {

  const extension =
    fileValidator(mimeType);

  // STANDALONE IMAGE
  if (
    extension === ".png" ||
    extension === ".jpg" ||
    extension === ".jpeg"
  ) {

    return {
      filePath,
      fileType: "image"
    };
  }

  // PDF ANALYSIS
  const text =
    await hasText(filePath);

  const image =
    await hasImage(filePath);

  let fileType: FileType;

  if ( text && !image ) {

    fileType = "pdf/text";

  } else if ( !text && image ) {

    fileType = "pdf/scanned";

  } else if ( text && image ) {

    fileType = "pdf/hybrid";

  } else {

    throw new Error(
      "Unknown PDF structure"
    );
  }

  return {
    filePath,
    fileType
  };
}