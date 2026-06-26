import type { ExtractedObject } from "../../../../modules/extractor/extractor.types";

import type { AnalyzedObject } from "../../../../modules/analyzer/analyzer.types";

import { getObjectChildren } from "../utils/debugger.utils";

import { renderObject } from "../renderers/render-object";

type Props = {
  object: ExtractedObject | AnalyzedObject;

  highlightedId: string | null;

  pageHeight: number;
};

const SCALE = 1;

export function ObjectRenderer({
  object,

  highlightedId,

  pageHeight,
}: Props) {
  const highlighted = highlightedId === object.id;

  const style = {
    position: "absolute" as const,

    left: object.x * SCALE,

    top: (pageHeight - object.y - object.height) * SCALE,

    width: object.width * SCALE,

    height: object.height * SCALE,

    pointerEvents: "none" as const,

    outline: highlighted ? "3px solid #00DDFF" : "none",
  };

  const children = getObjectChildren(object as any);

  return (
    <>
      {renderObject(object, style, highlighted)}

      {children.map((child) => (
        <ObjectRenderer
          key={child.id}
          object={child as any}
          highlightedId={highlightedId}
          pageHeight={pageHeight}
        />
      ))}
    </>
  );
}
