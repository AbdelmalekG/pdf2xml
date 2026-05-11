import { type FileType } from "./detector.types";

import { fileValidator } from "./validator/file-validator";
import { hasText } from "./analyzers/has-text";
import { hasImage } from "./analyzers/has-image";

export async function detectFileType(
  filePath: string,
  mimeType: string
): Promise<FileType> {

  const extension = fileValidator(mimeType);

  // # PURE IMAGE
  if (
    extension === ".png" ||
    extension === ".jpg" ||
    extension === ".jpeg"
  ) {
    return "image";
  }

  // # PDF ANALYSIS
  const text = await hasText(filePath);

  const image = await hasImage(filePath);

  // pdf/text
  if (text && !image) {
    return "pdf/text";
  }

  // pdf/scanned
  if (!text && image) {
    return "pdf/scanned";
  }

  // pdf/hybrid
  if (text && image) {
    return "pdf/hybrid";
  }

  throw new Error("Unknown PDF structure");
}