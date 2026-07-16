import type { XMLNode } from "./xml.types";

export function createDetailNode(
  children: XMLNode[]
): XMLNode {

  return {

    tag: "detail",

    children
  };
}