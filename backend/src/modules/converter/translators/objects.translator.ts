import {
  translateObject
} from "./object.translator";

import type {
  AnalyzedObject
} from "@modules/analyzer";

import type {
  XMLNode
} from "../xml/xml.types";

export function translateObjects(
  objects: AnalyzedObject[],
  dynamic: boolean
): XMLNode[] {

  return objects.map(

    object =>

      translateObject(
        object,
        dynamic
      )
  );
}