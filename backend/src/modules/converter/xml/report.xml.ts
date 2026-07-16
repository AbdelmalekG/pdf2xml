import type { XMLNode } from "./xml.types";

export function createReportNode(
  children: XMLNode[]
): XMLNode {

  return {

    tag: "report",

    children
  };
}