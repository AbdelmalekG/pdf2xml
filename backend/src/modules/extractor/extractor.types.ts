export type ObjectKind =
  | "text"
  | "image";

export type FontWeight =
  | "normal"
  | "bold";

export type BaseExtractedObject = {
  kind: ObjectKind;

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;
};

export type ExtractedText =
  BaseExtractedObject & {

    kind: "text";

    text: string;

    fontFamily: string;

    fontSize: number;

    fontWeight: FontWeight;

    italic: boolean;

    endX: number;

    endY: number;

    transform: number[];

    direction: "ltr" | "rtl" | "ttb" | "btt";
  };

export type ExtractedImage =
  BaseExtractedObject & {

    kind: "image";
  };

export type ExtractedLine = {
  text: string;

  objects: ExtractedText[];

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;
};

export type ExtractedParagraph = {
  lines: ExtractedLine[];

  text: string;

  page: number;
};

export type ExtractedObject =
  | ExtractedText
  | ExtractedImage;