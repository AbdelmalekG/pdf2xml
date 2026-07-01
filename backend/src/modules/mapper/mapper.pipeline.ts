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

export function mapperPipeline(
  document: AnalyzedDocument
) {

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

    detail,

    summary,

    footer:
      mapFooter(
        document,
        summary
      )
  };
}