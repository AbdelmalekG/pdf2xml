import fs from "fs";

export function loadFile(
  filePath: string
): Buffer {

  return fs.readFileSync(
    filePath
  );
}