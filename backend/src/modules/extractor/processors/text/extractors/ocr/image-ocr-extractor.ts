import Tesseract
  from "tesseract.js";

export async function imageOcrExtractor(
  filePath: string
) {

  const result =
    await Tesseract.recognize(
      filePath,
      "fra"
    );

  return [
    {
      result,
      page: 1
    }
  ];
}