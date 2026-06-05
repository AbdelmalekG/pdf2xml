import {
  extractText
} from "./text";

import {
  extractImage
} from "./image";

import {
  extractVector
} from "./vector";

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

  const vectors =
    await extractVector(
      document
    );

  return [
    ...texts,
    ...images,
    ...vectors
  ];
}