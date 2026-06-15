export type ExtractedObject = {

  id: string;

  kind: string;

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;

  text?: string;

  children?: ExtractedObject[];
};

export type ExtractResponse = {

  objects: ExtractedObject[];
};