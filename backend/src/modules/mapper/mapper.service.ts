import type {
  AnalyzedDocument
} from "@modules/analyzer";

import {
  mapperPipeline
} from "./mapper.pipeline";

export function mapDocument(
  document: AnalyzedDocument
) {
  return mapperPipeline(
    document
  );
}