import type { XMLNode } from "./xml.types";

export function createHeaderNode(
  children: XMLNode[]
): XMLNode {

  return {

    tag: "header",

    children
  };
}