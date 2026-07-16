import type { XMLNode } from "./xml.types";

export function createFooterNode(
  children: XMLNode[]
): XMLNode {

  return {

    tag: "footer",

    children
  };
}