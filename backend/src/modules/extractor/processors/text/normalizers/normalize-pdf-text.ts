import {
  detectFontStyle
} from "../detect-font-style";

import {
  type ExtractedText
} from "@modules/extractor";

export function normalizePdfText(
  rawTexts: any[]
): ExtractedText[] {

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
          transform[0]
        );

      const endX =
        x + width;

      const endY =
        y + height;

      const direction =
        item.dir ?? "ltr";

      return {
        id: 0,

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