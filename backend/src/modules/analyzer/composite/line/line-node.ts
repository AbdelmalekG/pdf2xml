import { CompositeNodeKind } from "../composite.types";
import type {
  LineChildNode,
  LineNode
} from "./line.types";

export function createLineNode(
  id: string,
  children: LineChildNode[]
): LineNode {

  const first =
    children[0]!;

  const x = first.x;

  const y = first.y;

  const endX =
    Math.max(
      ...children.map(
        child =>
          child.endX
      )
    );

  const endY =
    Math.max(
      ...children.map(
        child =>
          child.endY
      )
    );

  return {

    id,

    kind: CompositeNodeKind.line,

    children,

    x,
    y,

    width:
      endX - x,

    height:
      endY - y,

    endX,
    endY,

    page:
      first.page
  };
}
