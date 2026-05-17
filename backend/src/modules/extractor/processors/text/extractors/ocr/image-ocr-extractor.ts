import Tesseract
  from "tesseract.js";

import {
  loadImage
} from "@shared/utils/loaders";

export async function imageOcrExtractor(
  filePath: string
) {

  const image =
    loadImage(
      filePath
    );

  const result =
    await Tesseract.recognize(
      image,
      "fra"
    );

  return [
    {
      result,
      page: 1
    }
  ];
}