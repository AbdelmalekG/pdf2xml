import type {
  AnalyzedDocument
} from "@modules/analyzer";

import {
  mapperPipeline
} from "./mapper.pipeline";
import type { MappedDocument } from "./mapper.types";

export function mapDocument(
  document: AnalyzedDocument
): MappedDocument {
  return mapperPipeline(
    document
  );
}