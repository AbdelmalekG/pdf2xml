import type {
  ExtractedWord,
  ExtractedImage,
  ExtractedVector
} from "@extractor/extractor.types";

export const AnalyzedObjectKind = {
  sentence: "sentence",
  line: "line",
  box: "box"
} as const;

export type AnalyzedObjectKind =
  (typeof AnalyzedObjectKind)[keyof typeof AnalyzedObjectKind];

export type BaseAnalyzedObject = {

  id: string;

  kind: AnalyzedObjectKind;

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;
};

export type Sentence =
  BaseAnalyzedObject & {

    kind: typeof AnalyzedObjectKind.sentence;

    text: string;

    words: ExtractedWord[];

    endX: number;
    endY: number;
  };

export type Line =
  BaseAnalyzedObject & {

    kind: typeof AnalyzedObjectKind.line;

    children: Array<
      ExtractedWord |
      Sentence
    >;

    endX: number;
    endY: number;
  };

export type Box =
  BaseAnalyzedObject & {

    kind:
    typeof AnalyzedObjectKind.box;

    endX: number;
    endY: number;

    children: Array<
      | ExtractedWord
      | Sentence
      | ExtractedImage
    >;
  };

export type AnalyzedObject =
  | ExtractedWord
  | ExtractedVector
  | ExtractedImage
  | Sentence
  | Box;

export type AnalyzedPage = {
  id: string;

  number: number;

  width: number;
  height: number;

  content: AnalyzedObject[];
};

export type AnalyzedDocument = {
  pages: AnalyzedPage[];
};