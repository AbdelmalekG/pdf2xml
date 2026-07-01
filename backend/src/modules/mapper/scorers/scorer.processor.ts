import type {
  Table,
  AnalyzedDocument
} from "@modules/analyzer";

import type {
  TableRule,
  TableCandidate
} from "./scorer.types";

export function scoreTables(
  document: AnalyzedDocument,
  rules: TableRule[]
): TableCandidate[] {

  const tables =
    document.pages
      .flatMap(
        page => page.content
      )
      .filter(
        object =>
          object.kind === "table"
      ) as Table[];

  if (!tables.length) {

    throw new Error(
      "No table found."
    );

  }

  const candidates: TableCandidate[] =
    tables.map(table => {

      const candidate: TableCandidate = {

        table,

        confidence: 0,

        reasons: []

      };

      for (
        const rule
        of rules
      ) {

        if (
          rule.test(
            table,
            tables
          )
        ) {

          candidate.confidence +=
            rule.weight;

          candidate.reasons.push(
            rule.reason
          );
        }
      }

      return candidate;

    });

  candidates.sort(
    (
      a,
      b
    ) =>
      b.confidence -
      a.confidence
  );

  return candidates;

}