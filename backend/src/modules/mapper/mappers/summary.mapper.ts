import type {
  AnalyzedDocument,
} from "@modules/analyzer";

import {
  SummaryRules,
  scoreTables
} from "../scorers";

export function mapSummary(
  document: AnalyzedDocument
) {

  const ranked =
    scoreTables(
      document,
      SummaryRules
    );

  return ranked[0];
}