import * as pdfjs
  from "pdfjs-dist/legacy/build/pdf.mjs";

import {
  loadFile
} from "./file-loader";

export async function loadPdf(
  filePath: string
) {

  const buffer =
    loadFile(
      filePath
    );

  return pdfjs.getDocument({
    data: new Uint8Array(
      buffer
    )
  }).promise;
}