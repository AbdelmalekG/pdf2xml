import type {
  BaseAtomicNode
} from "../atomic.types";

export type RawImageNode =
  BaseAtomicNode & {

    kind: "image";

    buffer: Buffer;

    endX: number;

    endY: number;
  };