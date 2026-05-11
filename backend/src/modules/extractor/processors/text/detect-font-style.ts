import {
  type FontWeight
} from "@modules/extractor/extractor.types";

export function detectFontStyle(
  rawFontName: string
): {
  fontWeight: FontWeight;
  italic: boolean;
} {

  const normalized =
    rawFontName.toLowerCase();

  const isBold =
    normalized.includes("bold");

  const isItalic =
    normalized.includes("italic") ||
    normalized.includes("oblique");

  return {
    fontWeight:
      isBold
        ? "bold"
        : "normal",

    italic: isItalic
  };
}