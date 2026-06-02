import type {
  BaseAtomicNode,
  AtomicNodeKind,
} from "../atomic.types";

export const TextDirection = {
  ltr: "ltr",
  rtl: "rtl",
  ttb: "ttb",
  btt: "btt"
} as const;

export type TextDirection =
  (typeof TextDirection)[keyof typeof TextDirection];

export type RawWordNode =
  BaseAtomicNode & {

    kind: typeof AtomicNodeKind.word;

    text: string;

    direction?: TextDirection;

    transform?: number[];

    endX: number;

    endY: number;
  };