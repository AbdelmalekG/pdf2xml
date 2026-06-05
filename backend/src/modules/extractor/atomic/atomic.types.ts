export const AtomicNodeKind = {
  word: "word",
  image: "image",
  vector: "vector"
} as const;

export type AtomicNodeKind =
  (typeof AtomicNodeKind)[keyof typeof AtomicNodeKind];

export type BaseAtomicNode = {

  id: string;

  kind: AtomicNodeKind;

  x: number;
  y: number;

  width: number;
  height: number;

  page: number;

  consumed?: boolean;

  consumedBy?: string;
};