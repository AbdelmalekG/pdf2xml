import {
  textExtractor
} from "./text-extractor";

import {
  detectFontStyle
} from "./detect-font-style";

import {
  type ExtractedText
} from "@modules/extractor";

import { type FileType } from "@shared/types";

export async function extractText(
  filePath: string,
  fileType: FileType
): Promise<ExtractedText[]> {

  if (
    fileType !== "pdf/text" &&
    fileType !== "pdf/hybrid"
  ) {

    return [];
  }

  const rawTexts =
    await textExtractor(
      filePath
    );

  return rawTexts.map(
    ({
      item,
      page
    }) => {

      const text =
        item.str;

      const transform =
        item.transform;

      const [
        ,
        ,
        ,
        ,
        x,
        y
      ] = transform;

      const width =
        item.width;

      const height =
        item.height;

      const rawFontName =
        item.fontName ?? "";

      const fontFamily =
        rawFontName;

      const {
        fontWeight,
        italic
      } = detectFontStyle(
        rawFontName
      );

      const fontSize =
        Math.abs(
          item.transform[0]
        );

      const endX =
        x + width;

      const endY =
        y + height;

      const direction =
        item.dir ?? "ltr";

      return {
        kind: "text",

        text,

        x,
        y,

        width,
        height,

        page,

        fontFamily,

        fontSize,

        fontWeight,

        italic,

        endX,
        endY,

        transform,

        direction
      };
    }
  );
}