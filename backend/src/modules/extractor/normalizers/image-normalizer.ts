import type {
  RawImageNode
} from "../atomic/image/image.types";

import type {
  ExtractedImage
} from "../extractor.types";

export function normalizeImage(
  image: RawImageNode
): ExtractedImage {

  return {

    id:
      String(image.id),

    kind:
      "image",

    x:
      image.x,

    y:
      image.y,

    width:
      image.width,

    height:
      image.height,

    page:
      image.page
  };
}
