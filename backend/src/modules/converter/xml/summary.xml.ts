import type { XMLNode } from "./xml.types";

export function createSummaryNode(
  children: XMLNode[]
): XMLNode {
  
  return {

    tag: "summary",

    children
  };
}