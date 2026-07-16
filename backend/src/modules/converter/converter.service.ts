import {
  runConversion
} from "./converter.pipeline";

import type {
  MappedDocument
} from "@modules/mapper";

export async function convertDocument(
  document: MappedDocument
): Promise<string> {

  return runConversion(
    document
  );
}