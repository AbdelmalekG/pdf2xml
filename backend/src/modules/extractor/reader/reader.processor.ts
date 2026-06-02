import {
  readPdf
} from "./pdf-reader";

import {
  type DetectedFile
} from "@shared/types";

export async function readDocument(
  detectedFile: DetectedFile
) {

  switch (
    detectedFile.fileType
  ) {

    case "pdf/text":
    case "pdf/hybrid":

      return readPdf(
        detectedFile.filePath
      );

    default:

      throw new Error(
        `Unsupported file type : ${detectedFile.fileType}`
      );
  }
}