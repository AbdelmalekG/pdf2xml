import { OPS }
  from "pdfjs-dist/legacy/build/pdf.mjs";

import {
  createCanvas,
  ImageData
} from "canvas";

import {
  loadPdf
} from "@/shared/utils/loaders";

import fs from "fs";

export async function pdfImageExtractor(
  filePath: string
) {

  const pdf =
    await loadPdf(filePath);

  const rawImages:
    any[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page =
      await pdf.getPage(
        pageNumber
      );

    const operatorList =
      await page.getOperatorList();

    let currentTransform =
      [1, 0, 0, 1, 0, 0];

    for (
      let index = 0;
      index < operatorList.fnArray.length;
      index++
    ) {

      const operator =
        operatorList.fnArray[index];

      const args =
        operatorList.argsArray[index];

      // TRACK TRANSFORM
      if (
        operator === OPS.transform
      ) {

        currentTransform =
          args;

        continue;
      }

      // IMAGE OPS
      if (
        operator !== OPS.paintImageXObject &&
        operator !== OPS.paintInlineImageXObject &&
        operator !== OPS.paintXObject
      ) {
        continue;
      }

      let imageObject;

      if (
        operator ===
        OPS.paintInlineImageXObject
      ) {

        imageObject =
          args?.[0];

      } else {

        const imageName =
          args?.[0];

        if (
          typeof imageName !== "string"
        ) {
          continue;
        }

        imageObject =
          await new Promise<any>(
            resolve => {

              page.objs.get(
                imageName,
                (image: any) => {

                  resolve(image);
                }
              );
            }
          );
      }

      if (
        !imageObject ||
        !imageObject.data
      ) {
        continue;
      }

      const imageWidth =
        imageObject.width;

      const imageHeight =
        imageObject.height;

      const canvas =
        createCanvas(
          imageWidth,
          imageHeight
        );

      const context =
        canvas.getContext("2d");

      const imageData =
        new ImageData(
          Uint8ClampedArray.from(
            imageObject.data
          ),
          imageWidth,
          imageHeight
        );

      context.putImageData(
        imageData,
        0,
        0
      );

      const buffer =
        canvas.toBuffer(
          "image/png"
        );

      fs.writeFileSync(
        "debug.png",
        buffer
      );

      const [
        a,
        ,
        ,
        d,
        e,
        f
      ] = currentTransform;

      rawImages.push({

        buffer,

        imageWidth,
        imageHeight,

        x: e ?? 0,
        y: f ?? 0,

        width:
          Math.abs(a ?? 1),

        height:
          Math.abs(d ?? 1),

        page: pageNumber
      });
    }
  }

  return rawImages;
}