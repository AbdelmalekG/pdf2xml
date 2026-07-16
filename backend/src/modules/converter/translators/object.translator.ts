import type {
  AnalyzedObject
} from "@modules/analyzer";

import type {
  XMLNode
} from "../xml/xml.types";

export function translateObject(
  object: AnalyzedObject,
  dynamic: boolean
): XMLNode {

  const text =
    "text" in object
      ? object.text
      : "";

  return {

    tag: "object",

    children: [

      {
        tag: "id",
        text: object.id
      },

      {
        tag: "name",
        text: object.kind
      },

      {
        tag: "text",
        text
      },

      {
        tag: "dbf",
        text: dynamic
          ? text
          : ""
      },

      {
        tag: "type",
        text: dynamic
          ? "1"
          : "2"
      },

      {
        tag: "x",
        text: String(object.x)
      },

      {
        tag: "y",
        text: String(object.y)
      },

      {
        tag: "width",
        text: String(object.width)
      },

      {
        tag: "height",
        text: String(object.height)
      }

    ]
  };
}