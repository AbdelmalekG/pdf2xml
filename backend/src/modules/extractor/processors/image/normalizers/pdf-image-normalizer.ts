import {
  type ExtractedImage
} from "@modules/extractor";

export function normalizePdfImage(
  rawImages: any[]
): ExtractedImage[] {

  return rawImages.map((
    raw,
    index
  ) => {

    const image =
      raw.image;

    return {
      id: index,

      kind: "image",

      x: 0,
      y: 0,

      width:
        image.width,

      height:
        image.height,

      page:
        raw.page
    };
  });
}