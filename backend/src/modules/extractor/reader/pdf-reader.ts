import {
  loadPdf
} from "@shared/utils/loaders";

import type {
  PdfDocumentContext,
  PdfPageContext
} from "./reader.types";

export async function readPdf(
  filePath: string
): Promise<PdfDocumentContext> {

  const pdf =
    await loadPdf(
      filePath
    );

  const pages: PdfPageContext[] = [];

  for (
    let pageNumber = 1;
    pageNumber <= pdf.numPages;
    pageNumber++
  ) {

    const page =
      await pdf.getPage(
        pageNumber
      );

    pages.push({
      pageNumber,
      page
    });
  }

  let metadata = null;

  try {

    metadata =
      await pdf.getMetadata();

  } catch {

    metadata = null;
  }

  return {
    pdf,
    pages,
    metadata
  };
}