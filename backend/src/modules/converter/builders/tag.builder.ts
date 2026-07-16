import type {
  XMLNode
} from "../xml";

import {
  escapeXml
} from "./builders.utils";

export function buildTag(
  node: XMLNode
): string {

  if (
    node.children?.length
  ) {

    const children =

      node.children
        .map(buildTag)
        .join("");

    return `<${node.tag}>${children}</${node.tag}>`;
  }

  if (
    node.text !== undefined
  ) {
    
    if (!node.children?.length && !node.text) {
      return `<${node.tag}/>`;
    }

    return `<${node.tag}>${escapeXml(node.text)}</${node.tag}>`;
  }

  return `<${node.tag}/>`;
}