import {
  translateDocument
} from "./translators";

import {
  buildXml
} from "./builders/xml.builder";

import type {
  MappedDocument
} from "@modules/mapper";

export async function runConversion(
  document: MappedDocument
): Promise<string> {

  const root =

    translateDocument(
      document
    );

  return buildXml(
    root
  );
}