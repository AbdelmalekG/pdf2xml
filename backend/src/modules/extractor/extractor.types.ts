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

export type ExtractedLineVector =
  BaseExtractedObject & {

    kind: "vector";

    vectorKind: "line";

    x1: number;
    y1: number;

    x2: number;
    y2: number;

    flippedY: boolean;
  };

export type BezierSegment = {

  cp1x: number;
  cp1y: number;

  cp2x: number;
  cp2y: number;

  x: number;
  y: number;
};

export type ExtractedCurveVector =
  BaseExtractedObject & {

    kind: "vector";

    vectorKind: "curve";

    flippedY: boolean;

    startX: number;
    startY: number;

    segments: BezierSegment[];
  };

export type ExtractedVector =
  | ExtractedLineVector
  | ExtractedCurveVector;

export type ExtractedObject =
  | ExtractedWord
  | ExtractedVector
  | ExtractedImage;

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