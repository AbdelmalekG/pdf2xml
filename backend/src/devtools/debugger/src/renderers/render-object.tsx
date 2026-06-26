import type {
  ExtractedVector
} from "../../../../modules/extractor/extractor.types";

export function renderObject(
  object: any,
  style: React.CSSProperties,
  highlighted: boolean
) {

  if (object.kind === "word") {
    return (
      <div
        title={object.id}
        style={{
          ...style,

          whiteSpace: "nowrap",

          overflow: "visible",

          fontSize: `${object.height}px`,
        }}
      >
        {object.text}
      </div>
    );
  }

  if (
    object.kind === "vector" &&
    object.vectorKind === "line"
  ) {

    const vector: ExtractedVector =
      object;

    return (
      <div
        title={vector.id}
        style={{
          ...style,

          backgroundColor: "#000",
        }}
      />
    );
  }

  if (
    object.kind === "vector" &&
    object.vectorKind === "curve"
  ) {

    const pathData = [

      `M ${object.startX - object.x}
       ${object.startY - object.y}`,

      ...object.segments.map(
        (segment: any) =>
          `C
          ${segment.cp1x - object.x}
          ${segment.cp1y - object.y}

          ${segment.cp2x - object.x}
          ${segment.cp2y - object.y}

          ${segment.x - object.x}
          ${segment.y - object.y}`
      ),

    ].join(" ");

    return (
      <svg
        style={{
          ...style,

          overflow: "visible",
        }}
        width={object.width}
        height={object.height}
        viewBox={`0 0 ${object.width} ${object.height}`}
      >
        <path
          d={pathData}
          fill="none"
          stroke="red"
          strokeWidth={2}
        />
      </svg>
    );
  }

  if (
    object.kind === "image"
  ) {
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

  return (
    <div
      title={object.id}
      style={{
        ...style,

        boxSizing: "border-box",

        outline:
          highlighted
            ? "3px solid #00DDFF"
            : undefined,
      }}
    />
  );
}