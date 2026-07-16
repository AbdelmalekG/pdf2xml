import type { XMLNode } from "./xml.types";

export function createDatabaseNode(
  children: XMLNode[]
): XMLNode {

  return {

    tag: "db",

    children
  };
}