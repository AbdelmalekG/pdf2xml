import type { ExtractedObject } from "../types";

import {
  getNestedObjects,
  getObjectName
 } from "../utils/debugger.utils";

type Props = {
  pages: any[];

  onHover: (id: string | null) => void;
};

function ObjectTree({
  object,
  onHover,
  level = 0,
}: {
  object: any;
  onHover: (id: string | null) => void;
  level?: number;
}) {
  const children = getNestedObjects(object);

  if (children.length === 0) {
    return (
      <div
        style={{
          paddingLeft: level * 16,
          cursor: "pointer",
        }}
        onMouseEnter={() => onHover(object.id)}
        onMouseLeave={() => onHover(null)}
      >
        {object.id}
      </div>
    );
  }

  return (
    <details open>
      <summary
        onMouseEnter={() => onHover(object.id)}
        onMouseLeave={() => onHover(null)}
        style={{
          paddingLeft: level * 16,
          cursor: "pointer",
        }}
      >
        {object.id}
      </summary>

      {children.map((child: any) => (
        <ObjectTree
          key={child.id}
          object={child}
          onHover={onHover}
          level={level + 1}
        />
      ))}
    </details>
  );
}

export function Sidebar({ pages, onHover }: Props) {
  const allObjects = pages.flatMap((page) => page.content);

  const grouped = allObjects.reduce<Record<string, ExtractedObject[]>>(
    (acc, object) => {
      const key = getObjectName(object.id);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(object);

      return acc;
    },

    {},
  );

  return (
    <div
      style={{
        width: "100%",

        height: "100%",

        overflowX: "auto",
        overflowY: "auto",

        borderLeft: "1px solid #ddd",

        padding: "12px",

        boxSizing: "border-box",
      }}
    >
      {Object.entries(grouped)

        .map(([kind, items]) => (
          <details key={kind} open>
            <summary>
              {kind} ({items.length})
            </summary>

            {items.map((object) => (
              <ObjectTree key={object.id} object={object} onHover={onHover} />
            ))}
          </details>
        ))}
    </div>
  );
}
