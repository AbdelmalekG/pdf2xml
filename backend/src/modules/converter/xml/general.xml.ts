import type { XMLNode } from "./xml.types";

export function createGeneralNode(
  children: XMLNode[]
): XMLNode {
  
  return {

    tag: "general",

    children
  };
}