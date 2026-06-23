export const CompositeNodeKind = {
  sentence: "sentence",
  line: "line",
  paragraph: "paragraph",
  intersection: "intersection",
  box: "box"
} as const;

export type CompositeNodeKind =
  (typeof CompositeNodeKind)[keyof typeof CompositeNodeKind];

export type BaseCompositeNode = {

  id: string;

  kind: CompositeNodeKind;

  consumed?: boolean;

  consumedBy?: string;
};