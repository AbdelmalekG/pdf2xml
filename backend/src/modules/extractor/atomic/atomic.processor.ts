import {
  extractWord
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
    await extractWord(
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