import {
  translateObjects
} from "./objects.translator";

import {
  translateTable
} from "./table.translator";

import type {
  MappedSection
} from "@modules/mapper";

import type {
  Table
} from "@modules/analyzer";

import type {
  XMLNode
} from "../xml/xml.types";

export function translateStaticSection(
  section: MappedSection
): XMLNode[] {

  return translateObjects(
    section.objects,
    false
  );
}

export function translateDynamicSection(
  table: Table
): XMLNode[] {

  return translateTable(
    table
  );
}