import type { ExtractedVector, ExtractedObject } from "../../../../modules/extractor/extractor.types";
import type { AnalyzedObject } from "../../../../modules/analyzer/analyzer.types";

type Props = {
  object: 
    | ExtractedObject
    | AnalyzedObject;

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

  if (object.kind === "word") {
    return (
      <div
        title={object.id}
        style={{
          ...style,

          whiteSpace: "nowrap",

          overflow: "visible",

          fontSize: `${object.height * SCALE}px`,
        }}
      >
        {object.text}
      </div>
    );
  }

  if (object.kind === "vector") {
    console.log(object);
    const vector: ExtractedVector = object;

    return (
      <div
        title={vector.id}
        style={{
          ...style,

          top: vector.flippedY
            ? pageHeight - vector.y - vector.height
            : vector.y,

          backgroundColor: "#000",
        }}
      />
    );
  }

  if (object.kind === "image") {
    return (
      <div
        title={object.id}
        style={{
          ...style,

          border: "1px dashed #888",

          boxSizing: "border-box",
        }}
      />
    );
  }

  if (object.kind === "sentence") {
    return highlighted ? (
      <div
        title={object.id}
        style={{
          ...style,

          outline: "3px solid #00DDFF",
        }}
      />
    ) : null;
  }

  return (
    <div
      title={object.id}
      style={{
        ...style,

        boxSizing: "border-box",
      }}
    />
  );
}
