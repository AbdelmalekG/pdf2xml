import * as pdfjsLib
  from "pdfjs-dist/legacy/build/pdf.mjs";

import {
  loadFile
} from "@shared/utils/loaders";

export async function hasImage(
  filePath: string
): Promise<boolean> {

  const buffer =
    loadFile(
      filePath
    );

  const loadingTask =
    pdfjsLib.getDocument({
      data:
        new Uint8Array(
          buffer
        )
    });

  const pdf =
    await loadingTask.promise;

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page =
      await pdf.getPage(
        pageNumber
      );

    const operators =
      await page.getOperatorList();

    for (
      const fn
      of operators.fnArray
    ) {

      if (
        fn ===
          pdfjsLib.OPS.paintImageXObject ||

        fn ===
          pdfjsLib.OPS.paintInlineImageXObject
      ) {

        return true;
      }
    }
  }

  return false;
}