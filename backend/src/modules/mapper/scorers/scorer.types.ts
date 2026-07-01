import type {
  Table
} from "@modules/analyzer";

export type TableRule = {

  reason: string;

  weight: number;

  test: (
    table: Table,
    tables: Table[]
  ) => boolean;
};

export type TableCandidate = {

  table: Table;

  confidence: number;

  reasons: string[];
};