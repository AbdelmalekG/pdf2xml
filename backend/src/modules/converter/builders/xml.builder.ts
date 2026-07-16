import {
  buildTag
} from "./tag.builder";

import type {
  XMLNode
} from "../xml/xml.types";

export function buildXml(
  root: XMLNode
): string {

  return [
    '<?xml version="1.0" encoding="ISO-8859-1"?>',
    buildTag(root)
  ].join("\n");
}