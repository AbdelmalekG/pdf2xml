import Tesseract
  from "tesseract.js";

export const tesseractWorker =
  await Tesseract.createWorker("fra");