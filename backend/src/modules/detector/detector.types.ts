import { type FileType } from "@shared/types";

export type DetectedFile = {
  filePath: string;

  fileType: FileType;
};