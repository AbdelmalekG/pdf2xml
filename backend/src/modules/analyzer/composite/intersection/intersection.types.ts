import type { CompositeNodeKind } from "../composite.types";

export interface IntersectionNode {

  id: string;

  kind: typeof CompositeNodeKind.intersection;

  x: number;

  y: number;

  horizontalId: string;

  verticalId: string;
}