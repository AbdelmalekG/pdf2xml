import {
  extractText
} from "./text/extract-text";

import {
  extractImage
} from "./image/extract-image";

export async function processAtomic(
  document: any
) {

  const texts =
    await extractText(
      document
    );

  const images =
    await extractImage(
      document
    );

  return [
    ...texts,
    ...images
  ];
}