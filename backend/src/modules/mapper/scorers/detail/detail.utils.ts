import type {
  Table
} from "@modules/analyzer";

export function headerContainsDetailKeyword(
  table: Table
): boolean {

  const header =
    table.rows.at(-1);

  if (!header) {
    return false;
  }

  const keywords = [

    "designation",
    "désignation",
    "description",
    "article",
    "produit",
    "reference",
    "référence",
    "ref",
    "quantite",
    "quantité",
    "qte",
    "qté",
    "prix",
    "price",
    "montant",
    "amount",
    "unite",
    "unité",
    "code"

  ];

  return header.boxes.some(

    box =>

      box.children.some(

        child => {

          if (!("text" in child)) {
            return false;
          }

          const text =
            child.text
              .toLowerCase()
              .trim();

          return keywords.some(
            keyword =>
              text.includes(
                keyword
              )
          );

        }

      )

  );

}