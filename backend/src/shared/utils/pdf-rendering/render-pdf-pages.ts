import fs
  from "fs/promises";

import path
  from "path";

import {
  pdf
} from "pdf-to-img";

export async function renderPdfPages(
  filePath: string
): Promise<string[]> {

  const document =
    await pdf(
      filePath,
      {
        scale: 3
      }
    );

  const fileName =
    path.basename(
      filePath
    );

  const outputDirectory =
    path.join(
      "src",
      "uploads",
      fileName
    );

  await fs.mkdir(
    outputDirectory,
    {
      recursive: true
    }
  );

  const pagePaths:
    string[] = [];

  let pageNumber = 1;

  for await (
    const imageBuffer
    of document
  ) {

    const pagePath =
      path.join(
        outputDirectory,
        `page-${pageNumber}.png`
      );

    await fs.writeFile(
      pagePath,
      imageBuffer
    );

    pagePaths.push(
      pagePath
    );

    pageNumber++;
  }

  return pagePaths;
}