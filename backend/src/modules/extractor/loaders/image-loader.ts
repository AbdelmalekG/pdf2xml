import fs from "fs";

export function loadImage(
  filePath: string
): Buffer {

  return fs.readFileSync(
    filePath
  );
}