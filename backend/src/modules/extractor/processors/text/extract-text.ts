import {
  type ExtractedText
} from "@modules/extractor/extractor.types";

import {
  detectFontStyle
} from "./detect-font-style";

export function extractText(
  item: any,
  page: number,
  pageWidth: number
): ExtractedText {

  const text = item.str;

  const transform = item.transform;

  const [
    ,
    ,
    ,
    ,
    x,
    y
  ] = transform;

  const width = item.width;

  const height = item.height;

  const rawFontName = item.fontName ?? "";

  const fontFamily = rawFontName;

  const { fontWeight, italic } = detectFontStyle(rawFontName);

  const fontSize = Math.abs(item.transform[0]);

  const endX = x + item.width;

  const endY = y + item.height;
  
  const direction = item.dir ?? "ltr";

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