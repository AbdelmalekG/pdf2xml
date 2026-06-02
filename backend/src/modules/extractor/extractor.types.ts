import { type TextDirection } from "./atomic";

export const ExtractedObjectKind = {
  word: "word",
  sentence: "sentence",
  line: "line",
  image: "image"
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

export type ExtractedSentence =
  BaseExtractedObject & {

    kind: typeof ExtractedObjectKind.sentence;

    text: string;

    words: ExtractedWord[];

    endX: number;
    endY: number;
  };

export type ExtractedLine =
  BaseExtractedObject & {

    kind: typeof ExtractedObjectKind.line;

    children: Array<
      ExtractedWord |
      ExtractedSentence
    >;

    endX: number;
    endY: number;
  };

export type ExtractedImage =
  BaseExtractedObject & {

    kind: typeof ExtractedObjectKind.image;
  };

export type ExtractedObject =
  | ExtractedWord
  | ExtractedSentence
  | ExtractedLine
  | ExtractedImage;
