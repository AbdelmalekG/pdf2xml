export const xmlStructure = {

  report: [
    "db",
    "general",
    "header",
    "detail",
    "summary",
    "footer"
  ],

  db: [
    "source",
    "argument"
  ],

  source: [
    "id",
    "type",
    "name",
    "sql"
  ],

  argument: [
    "id",
    "type",
    "name",
    "text",
    "size",
    "size2",
    "visible",
    "vtable",
    "vid",
    "vname"
  ],

  general: [
    "prop"
  ],

  prop: [
    "name",
    "text",
    "orientation",
    "paper",
    "unit",
    "lines",
    "grid",
    "width",
    "height"
  ],

  header: [
    "height",
    "object"
  ],

  detail: [
    "height",
    "object"
  ],

  summary: [
    "height",
    "object"
  ],

  footer: [
    "height",
    "object"
  ],

  object: [
    "id",
    "name",
    "text",
    "dbf",
    "type",
    "format",
    "x",
    "y",
    "width",
    "height",
    "fontname",
    "fontsize",
    "fontstyle",
    "align",
    "border",
    "background"
  ]

} as const;