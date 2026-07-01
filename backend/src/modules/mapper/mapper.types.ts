import type {
  Table,
  AnalyzedObject
} from "@modules/analyzer";

export type XmlSection =
  | "header"
  | "detail"
  | "summary"
  | "footer";

export type MappedSection = {

  objects: AnalyzedObject[];
};

export type MappedDocument = {

  header: MappedSection;

  detail: {

    table: Table;
  };

  summary: {

    table: Table;
  };

  footer: MappedSection;
};