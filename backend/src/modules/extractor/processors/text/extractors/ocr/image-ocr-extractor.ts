import {
  tesseractWorker
} from "@shared/lib";

export async function imageOcrExtractor(
  filePath: string
) {

  const result =
    await tesseractWorker.recognize(
      filePath
    );

  return [
    {
      result,
      page: 1
    }
  ];
}