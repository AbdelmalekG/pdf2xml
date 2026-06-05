import * as pdfjsLib
  from "pdfjs-dist/legacy/build/pdf.mjs";

import type {
  PdfDocumentContext
} from "@modules/extractor/reader";

import type {
  RawVectorNode
} from "../vector.types";

import {
  isHorizontalLine,
  isPageSizedShape,
  isVerticalLine
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

    for (
      let i = 0;
      i < operatorList.fnArray.length;
      i++
    ) {

      const fn =
        operatorList.fnArray[i];

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

      const [
        left,
        bottom,
        right,
        top
      ] = Array.from(bbox) as [
        number,
        number,
        number,
        number
      ];

      const width =
        Math.abs(
          right - left
        );

      const height =
        Math.abs(
          top - bottom
        );

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
        isHorizontalLine(
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
        isVerticalLine(
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