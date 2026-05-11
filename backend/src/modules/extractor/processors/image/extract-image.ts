import sizeOf
  from "image-size";

import fs from "fs";

import {
  type ExtractedImage
} from "../../extractor.types";

export function processStandaloneImage(
  filePath: string
): ExtractedImage {

  const dimensions =
    sizeOf(
      fs.readFileSync(filePath)
    );

  return {
    kind: "image",

    x: 0,
    y: 0,

    width:
      dimensions.width ?? 0,

    height:
      dimensions.height ?? 0,

    page: 1
  };
}

export function processPdfImage(
  transform: number[],
  page: number
): ExtractedImage {

  const [
    width = 0,
    ,
    ,
    height = 0,
    x = 0,
    y = 0
  ] = transform;

  return {
    kind: "image",

    x,
    y,

    width:
      Math.abs(width),

    height:
      Math.abs(height),

    page
  };
}