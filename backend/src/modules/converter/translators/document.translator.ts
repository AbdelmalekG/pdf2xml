import {
  createHeaderNode
} from "../xml/header.xml";

import {
  createDetailNode
} from "../xml/detail.xml";

import {
  createSummaryNode
} from "../xml/summary.xml";

import {
  createFooterNode
} from "../xml/footer.xml";

import {
  createReportNode
} from "../xml/report.xml";

import {
  translateStaticSection,
  translateDynamicSection
} from "./section.translator";

import type {
  MappedDocument
} from "@modules/mapper";

import type {
  XMLNode
} from "../xml/xml.types";

export function translateDocument(
  document: MappedDocument
): XMLNode {

  return createReportNode([

    createHeaderNode(

      translateStaticSection(
        document.header
      )
    ),

    createDetailNode(

      translateDynamicSection(
        document.detail.table
      )
    ),

    createSummaryNode(

      translateDynamicSection(
        document.summary.table
      )
    ),

    createFooterNode(

      translateStaticSection(
        document.footer
      )
    )

  ]);
}