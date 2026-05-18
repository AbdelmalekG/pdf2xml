import {
  type ExtractedImage
} from "@modules/extractor";

export function normalizePdfImage(
  rawImages: any[]
): ExtractedImage[] {

  return rawImages.map(
    ({
      x,
      y,
      width,
      height,
      page
    }) => {

      return {
        id: 0,

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