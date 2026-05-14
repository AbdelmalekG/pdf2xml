import { OPS } from "pdfjs-dist";

import {
  loadPdf
} from "@modules/extractor/loaders";

import {
  isImageObject
} from "@modules/extractor/classifiers";

export async function pdfImageExtractor(
  filePath: string
) {

  const pdf =
    await loadPdf(filePath);

  const rawImages: any[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page =
      await pdf.getPage(pageNumber);

    const operatorList =
      await page.getOperatorList();

    let currentTransform = [1, 0, 0, 1, 0, 0];

    for (
      let index = 0;
      index < operatorList.fnArray.length;
      index++
    ) {

      const operator =
        operatorList.fnArray[index];

      const args =
        operatorList.argsArray[index];

      // Track transform matrix
      if (
        operator === OPS.transform
      ) {

        currentTransform = args;

        continue;
      }

      // Detect image operators
      if (
        operator !== OPS.paintImageXObject &&
        operator !== OPS.paintXObject
      ) {
        continue;
      }

      const imageName =
        args?.[0];

      if (
        typeof imageName !== "string"
      ) {
        continue;
      }

      const imageObject =
        page.objs.get(imageName);

      if (!imageObject) {
        continue;
      }

      const [
        a,
        b,
        c,
        d,
        e,
        f
      ] = currentTransform;

      rawImages.push({
        imageObject,

        x: e ?? 0,
        y: f ?? 0,

        width: Math.abs(a ?? 1),
        height: Math.abs(d ?? 1),

        page: pageNumber
      });
    }
  }

  return rawImages;
}