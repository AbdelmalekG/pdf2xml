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
  multiply,
  extractBezierSegments,
  transformPoint
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

    const pageYOffset =
      context.page.view[1]!;

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

      const p1 =
        transformPoint(
          rawLeft,
          rawBottom,
          ctm
        );

      const p2 =
        transformPoint(
          rawRight,
          rawTop,
          ctm
        );

      const left =
        Math.min(p1.x, p2.x);

      const right =
        Math.max(p1.x, p2.x);

      const bottom =
        Math.min(p1.y, p2.y) -
        pageYOffset;

      const top =
        Math.max(p1.y, p2.y) -
        pageYOffset;

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
        command === 28 &&
        !isHorizontalVector(
          width,
          height
        ) &&
        !isVerticalVector(
          width,
          height
        )
      ) {

        const path =
          args?.[1]?.[0];

        if (
          !(path instanceof Float32Array)
        ) {
          continue;
        }

        const curve =
          extractBezierSegments(path);

        if (
          curve.segments.length === 0
        ) {
          continue;
        }

        const start =
          transformPoint(
            curve.startX,
            curve.startY,
            ctm
          );

        start.y -= pageYOffset;

        const segments =
          curve.segments
            .map(segment => {

              const cp1 =
                transformPoint(
                  segment.cp1x,
                  segment.cp1y,
                  ctm
                );

              const cp2 =
                transformPoint(
                  segment.cp2x,
                  segment.cp2y,
                  ctm
                );

              const end =
                transformPoint(
                  segment.x,
                  segment.y,
                  ctm
                );

              cp1.y -= pageYOffset;
              cp2.y -= pageYOffset;
              end.y -= pageYOffset;

              return {

                cp1x: cp1.x,
                cp1y: cp1.y,

                cp2x: cp2.x,
                cp2y: cp2.y,

                x: end.x,
                y: end.y
              };
            });

        vectors.push({

          id:
            `curve-${id++}`,

          kind:
            "vector",

          vectorKind:
            "curve",

          page:
            context.pageNumber,

          x: left,
          y: bottom,

          width,
          height,

          flippedY,

          startX: start.x,
          startY: start.y,

          segments
        });

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

          vectorKind:
            "line",

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

          vectorKind:
            "line",

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