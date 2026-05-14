import {
  pdfImageExtractor
} from "./pdf-image-extractor";

import {
  standaloneImageExtractor
} from "./standalone-image-extractor";

import {
  type ExtractedImage
} from "@modules/extractor";

import { type FileType } from "@shared/types";

export async function extractImage(
  filePath: string,
  fileType: FileType
): Promise<ExtractedImage[]> {

  // STANDALONE IMAGE
  if (
    fileType === "image"
  ) {

    const image =
      standaloneImageExtractor(
        filePath
      );

    return [
      {
        kind: "image",

        x: 0,
        y: 0,

        width:
          image.width,

        height:
          image.height,

        page: 1
      }
    ];
  }

  // PDF IMAGES
  const rawImages =
    await pdfImageExtractor(
      filePath
    );

  return rawImages.map(
    ({
      imageObject,
      x,
      y,
      width,
      height,
      page
    }) => {

      return {
        kind: "image",

        x,
        y,

        width,
        height,

        page
      };
    }
  );
}