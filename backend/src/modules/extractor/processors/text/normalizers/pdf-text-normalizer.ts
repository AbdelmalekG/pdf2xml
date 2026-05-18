import {
  type ExtractedText
} from "@modules/extractor";

export function normalizePdfText(
  rawTexts: any[]
): ExtractedText[] {

  return rawTexts.map((
    raw,
    index
  ) => {

    const item =
      raw.item;

    return {
      id: index,

      kind: "text",

      text:
        item.str,

      x:
        item.x,

      y:
        item.y,

      width:
        item.width,

      height:
        item.height,

      endX:
        item.x + item.width,

      endY:
        item.y + item.height,

      page:
        raw.page,

      direction:
        item.dir,

      transform:
        item.transform,

      fontFamily:
        item.font?.name,

      fontSize:
        item.font?.size,

      italic: false,

      fontWeight: "normal"
    };
  });
}