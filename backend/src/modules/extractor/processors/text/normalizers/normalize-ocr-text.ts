import {
  type ExtractedText
} from "@modules/extractor";

export function normalizeOcrText(
  rawTexts: any[]
): ExtractedText[] {

  return rawTexts.map(
    ({
      result,
      page
    }) => {

      return {
        id: 0,

        kind: "text",

        text:
          result.data.text,

        x: 0,
        y: 0,

        width: 0,
        height: 0,

        endX: 0,
        endY: 0,

        page,

        source: "ocr",

        confidence:
          result.data.confidence
      };
    }
  );
}