// processors/processor.ts

import {
  type ExtractedObject
} from "@modules/extractor";

import {
  type DetectedFile
} from "@modules/detector";

import {
  extractImage,
  extractText
} from "@modules/extractor";

const ROW_TOLERANCE = 10;

export async function processFile(
  detectedFile: DetectedFile
): Promise<ExtractedObject[]> {

  const {
    filePath,
    fileType
  } = detectedFile;

  const objects:
    ExtractedObject[] = [];

  // TEXTS
  if (
    fileType === "pdf/text" ||
    fileType === "pdf/hybrid"
  ) {

    const texts =
      await extractText(
        filePath,
        fileType
      );

    objects.push(
      ...texts
    );
  }

  // IMAGES
  if (
    fileType === "image" ||
    fileType === "pdf/scanned" ||
    fileType === "pdf/hybrid"
  ) {

    const images =
      await extractImage(
        filePath,
        fileType
      );

    objects.push(
      ...images
    );
  }

  // SORT TOP → BOTTOM
  const remainingObjects =
    [...objects].sort(
      (a, b) => {

        // PAGE ORDER
        if (
          a.page !== b.page
        ) {

          return (
            a.page - b.page
          );
        }

        // TOP → BOTTOM
        return b.y - a.y;
      }
    );

  const sortedObjects:
    ExtractedObject[] = [];

  // BUILD ROWS
  while (
    remainingObjects.length > 0
  ) {

    const anchorObject =
      remainingObjects[0];

    if (!anchorObject) {
      break;
    }

    const currentRow =
      remainingObjects.filter(
        object => {

          return (
            object.page ===
              anchorObject.page &&
            Math.abs(
              object.y -
              anchorObject.y
            ) <= ROW_TOLERANCE
          );
        }
      );

    // SORT ROW LEFT → RIGHT
    currentRow.sort(
      (a, b) => {

        return a.x - b.x;
      }
    );

    sortedObjects.push(
      ...currentRow
    );

    // REMOVE PROCESSED OBJECTS
    for (
      const rowObject
      of currentRow
    ) {

      const index =
        remainingObjects.indexOf(
          rowObject
        );

      if (
        index !== -1
      ) {

        remainingObjects.splice(
          index,
          1
        );
      }
    }
  }

  // ASSIGN IDS
  let currentId = 1;

  return sortedObjects.map(
    object => ({
      ...object,
      id: currentId++
    })
  );
}