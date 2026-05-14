import fs from "fs";

import * as pdfjs
  from "pdfjs-dist/legacy/build/pdf.mjs";

export async function loadPdf(
  filePath: string
) {

  const data =
    new Uint8Array(
      fs.readFileSync(filePath)
    );

  return pdfjs.getDocument({
    data
  }).promise;
}