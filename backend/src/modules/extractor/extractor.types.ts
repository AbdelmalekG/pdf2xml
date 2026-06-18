import { type TextDirection } from "./atomic";

export const ExtractedObjectKind = {
  word: "word",
  image: "image",
  vector: "vector",
} as const;

export type ExtractedObjectKind =
  (typeof ExtractedObjectKind)[keyof typeof ExtractedObjectKind];

export type BaseExtractedObject = {

  id: string;

  kind: ExtractedObjectKind;

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;
};

export type ExtractedWord =
  BaseExtractedObject & {

    kind: typeof ExtractedObjectKind.word;

    text: string;

    direction?: TextDirection;

    transform?: number[];

    endX?: number;

    endY?: number;
  };

export type ExtractedImage =
  BaseExtractedObject & {

    kind: typeof ExtractedObjectKind.image;

    endX: number;
    endY: number;
  };

export type ExtractedVector =
  BaseExtractedObject & {

    kind:
      typeof ExtractedObjectKind.vector;

    x1: number;
    y1: number;

    x2: number;
    y2: number;

    flippedY: boolean;
  };

export type ExtractedObject =
  | ExtractedWord
  | ExtractedVector
  | ExtractedImage

export type ExtractedPage = {

  id: string;

  number: number;

  width: number;
  height: number;

  content: ExtractedObject[];
};

export type ExtractedDocument = {

  pages: ExtractedPage[];
};