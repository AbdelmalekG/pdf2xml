import { ObjectRenderer } from "./ObjectRenderer";

type Props = {
  pages: any[];

  highlightedId: string | null;
};

const SCALE = 1;

function flattenObjects(objects: any[]): any[] {
  const result: any[] = [];

  function visit(object: any) {
    result.push(object);

    object.children?.forEach(visit);

    object.words?.forEach(visit);
  }

  objects.forEach(visit);

  return result;
}

export function PageViewer({ pages, highlightedId }: Props) {
  return (
    <div
      style={{
        flex: 1,

        overflowX: "auto",

        overflowY: "auto",

        display: "flex",

        flexDirection: "column",

        alignItems: "center",

        padding: "24px",

        gap: "24px",

        boxSizing: "border-box",
      }}
    >
      {pages.map((page, index) => (
        <div
          key={page.id ?? index}
          style={{
            position: "relative",

            width: page.width * SCALE,

            height: page.height * SCALE,

            border: "1px solid #ccc",

            flexShrink: 0,
          }}
        >
          {flattenObjects(page.content).map((object) => (
            <ObjectRenderer
              key={object.id}
              object={object}
              highlightedId={highlightedId}
              pageHeight={page.height}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
