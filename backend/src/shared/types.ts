export type FileType =
  | "image"
  | "pdf/text"
  | "pdf/scanned"
  | "pdf/hybrid";

export type DetectedFile = {
  filePath: string;

  fileType: FileType;
};