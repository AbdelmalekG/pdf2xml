import {
  type OcrExtractedText
} from "@modules/extractor";

export function normalizeOcrText(
  rawTexts: any[]
): OcrExtractedText[] {

  return rawTexts.map((
    raw,
    index
  ) => {

    const data =
      raw.result.data;

    return {
      id: index,

      kind: "text",

      text:
        data.text,

      x: 0,
      y: 0,

      width: 0,
      height: 0,

      page:
        raw.page,

      source: "ocr",

      confidence:
        Math.round(
          data.confidence
        )
    };
  });
}