import fs from "fs";
import { pdfToText } from "pdf-ts";

export async function hasText(
  filePath: string
): Promise<boolean> {

  const buffer = fs.readFileSync(filePath);

  const extractedText = await pdfToText(buffer);

  return extractedText.trim().length > 0;
}