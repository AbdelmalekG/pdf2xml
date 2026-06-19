import type {
  ExtractedVector,
  ExtractedObject,
} from "../../../../modules/extractor/extractor.types";
import type { AnalyzedObject } from "../../../../modules/analyzer/analyzer.types";

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

  if (object.kind === "vector" && object.vectorKind === "line") {
    const vector: ExtractedVector = object;

    return (
      <div
        title={vector.id}
        style={{
          ...style,

          top: (pageHeight - object.y - object.height) * SCALE,

          backgroundColor: "#000",
        }}
      />
    );
  }

  if (object.kind === "vector" && object.vectorKind === "curve") {
    const pathData = [
      `M ${object.startX - object.x}
       ${object.startY - object.y}`,

      ...object.segments.map(
        (segment) =>
          `C
        ${segment.cp1x - object.x}
        ${segment.cp1y - object.y}

        ${segment.cp2x - object.x}
        ${segment.cp2y - object.y}

        ${segment.x - object.x}
        ${segment.y - object.y}
      `,
      ),
    ].join(" ");

    return (
      <svg
        style={{
          ...style,

          top: (pageHeight - object.y - object.height) * SCALE,

          overflow: "visible"
        }}
        width={object.width}
        height={object.height}
        viewBox={`0 0 ${object.width} ${object.height}`}
      >
        <path d={pathData} fill="none" stroke="red" strokeWidth={2} />
      </svg>
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
