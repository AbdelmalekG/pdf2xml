export const StructuralNodeKind = {
  row: "row",
  column: "column",
  table: "table"
} as const;

export type StructuralNodeKind =
  (typeof StructuralNodeKind)[keyof typeof StructuralNodeKind];

export type BaseStructuralNode = {

  id: string;

  kind: StructuralNodeKind;

  consumed?: boolean;

  consumedBy?: string;
};