import * as pdfjsLib
  from "pdfjs-dist/legacy/build/pdf.mjs";

import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import type {
  RawVectorNode
} from "../vector.types";

import {
  isHorizontalVector,
  isPageSizedShape,
  isVerticalVector,
  multiply
} from "../vector.utils";

import { IGNORED_VECTOR_COMMANDS } from "../vector.constants";

const { OPS } =
  pdfjsLib;

export async function extractPdfVectors(
  document: PdfDocumentContext
): Promise<RawVectorNode[]> {

  const vectors:
    RawVectorNode[] = [];

  let id = 0;

  for (
    const context
    of document.pages
  ) {

    const operatorList =
      await context.page.getOperatorList();

    const viewport =
      context.page.getViewport({
        scale: 1
      });

    let ctm = [1, 0, 0, 1, 0, 0];

    const stack: number[][] = [];

    for (
      let i = 0;
      i < operatorList.fnArray.length;
      i++
    ) {

      const fn =
        operatorList.fnArray[i]!;

      if (fn === OPS.save) {

        stack.push([...ctm]);

        continue;
      }

      if (fn === OPS.restore) {

        const previous = stack.pop();

        if (previous) {
          ctm = previous;
        }

        continue;
      }

      if (fn === OPS.transform) {

        const matrix =
          operatorList.argsArray[i] as number[];

        ctm =
          multiply(
            ctm,
            matrix
          );

        continue;
      }

      if (
        fn !== OPS.constructPath
      ) {
        continue;
      }
      const args =
        operatorList.argsArray[i];

      const command =
        args?.[0];

      // Ignore unwanted path commands
      if (
        IGNORED_VECTOR_COMMANDS.includes(
          command as never
        )
      ) {
        continue;
      }

      const bbox =
        args?.[2];

      if (
        !(bbox instanceof Float32Array) ||
        bbox.length !== 4
      ) {
        continue;
      }

      const scaleX =
        Math.sqrt(
          ctm[0]! * ctm[0]! +
          ctm[1]! * ctm[1]!
        );

      const scaleY =
        Math.sqrt(
          ctm[2]! * ctm[2]! +
          ctm[3]! * ctm[3]!
        );

      const [
        rawLeft,
        rawBottom,
        rawRight,
        rawTop
      ] = Array.from(bbox) as [number, number, number, number];

      const left =
        rawLeft * scaleX;

      const right =
        rawRight * scaleX;

      const bottom =
        rawBottom * scaleY;

      const top =
        rawTop * scaleY;

      const width =
        Math.abs(
          right - left
        );

      const height =
        Math.abs(
          top - bottom
        );

      const flippedY = ctm[3]! > 0;

      if (
        isPageSizedShape(
          width,
          height,
          viewport.width,
          viewport.height
        )
      ) {
        continue;
      }

      if (
        isHorizontalVector(
          width,
          height
        )
      ) {
        vectors.push({

          id:
            `vector-${id++}`,

          kind:
            "vector",

          page:
            context.pageNumber,

          x: left,
          y: bottom,

          flippedY: flippedY,

          width,
          height,

          x1: left,
          y1: bottom,

          x2: right,
          y2: bottom
        });

        continue;
      }

      if (
        isVerticalVector(
          width,
          height
        )
      ) {

        vectors.push({

          id:
            `vector-${id++}`,

          kind:
            "vector",

          page:
            context.pageNumber,

          x: left,
          y: bottom,

          flippedY: flippedY,

          width,
          height,

          x1: left,
          y1: bottom,

          x2: left,
          y2: top
        });
      }
    }
  }

  return vectors;
}