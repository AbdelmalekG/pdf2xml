import type {
  PDFDocumentProxy,
  PDFPageProxy
} from "pdfjs-dist/types/src/display/api";

export type PdfPageContext = {
  pageNumber: number;
  page: PDFPageProxy;
};

export type PdfDocumentContext = {
  pdf: PDFDocumentProxy;

  pages: PdfPageContext[];

  metadata: Awaited<
    ReturnType<PDFDocumentProxy["getMetadata"]>
  > | null;
};