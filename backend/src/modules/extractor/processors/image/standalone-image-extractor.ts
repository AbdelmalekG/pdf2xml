import {
  loadImage
} from "@modules/extractor/loaders";

import sizeOf
  from "image-size";

export function standaloneImageExtractor(
  filePath: string
) {

  const buffer =
    loadImage(filePath);

  const dimensions =
    sizeOf(buffer);

  return {
    buffer,

    width:
      dimensions.width ?? 0,

    height:
      dimensions.height ?? 0
  };
}