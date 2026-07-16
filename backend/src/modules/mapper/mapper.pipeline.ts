import type {
  AnalyzedDocument
} from "@modules/analyzer";

import {
  scoreTables,
  DetailRules
} from "./scorers";

import {
  mapDetail,
  mapSummary,
  mapHeader,
  mapFooter
} from "./mappers";

import type { MappedDocument } from "./mapper.types";

export function mapperPipeline(
  document: AnalyzedDocument
): MappedDocument {

  const rankedDetail =
    scoreTables(
      document,
      DetailRules
    )[0]!;

  const detail =
    mapDetail(
      rankedDetail.table
    );

  const summary =
    mapSummary(
      document
    )!;

  return {

    header:
      mapHeader(
        document,
        rankedDetail.table
      ),

    detail: {
      table: detail
    },

    summary,

    footer:
      mapFooter(
        document,
        summary
      )
  };
}