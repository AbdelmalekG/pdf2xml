import {
  createWordNode
} from "@modules/extractor/atomic/text";

const SPACE_WIDTH_RATIO = 0.3;

type TextSegment = {

  text: string;

  leadingSpaces: number;
};

export function normalizeTextItems(
  rawItems: any[]
) {

  let id = 0;

  return rawItems
    .filter(
      raw =>
        raw.item?.str?.trim().length > 0
    )
    .flatMap(
      (
        raw
      ) => {

        const item =
          raw.item;

        const transform =
          item.transform;

        const x =
          transform[4];

        const y =
          transform[5];

        const width =
          item.width;

        const height =
          item.height;

        const segments =
          splitTextSegments(
            item.str
          );

        const spaceWidth =
          height *
          SPACE_WIDTH_RATIO;

        const totalGapWidth =
          segments.reduce(
            (
              total,
              segment
            ) =>
              total +
              (
                segment.leadingSpaces *
                spaceWidth
              ),
            0
          );

        const totalTextLength =
          segments.reduce(
            (
              total,
              segment
            ) =>
              total +
              segment.text.length,
            0
          );

        const textWidth =
          Math.max(
            width - totalGapWidth,
            0
          );

        const unitWidth =
          totalTextLength > 0
            ? textWidth / totalTextLength
            : 0;

        let currentX =
          x;

        return segments.map(
          segment => {

            currentX +=
              segment.leadingSpaces *
              spaceWidth;

            const segmentWidth =
              segment.text.length *
              unitWidth;

            const word =
              createWordNode({

                id:
                  `word-${id++}`,

                text:
                  segment.text,

                x:
                  currentX,

                y,

                width:
                  segmentWidth,

                height,

                page:
                  raw.page,

                direction:
                  item.dir,

                transform:
                  [
                    ...transform.slice(
                      0,
                      4
                    ),
                    currentX,
                    y
                  ]
              });

            currentX +=
              segmentWidth;

            return word;
          }
        );
      }
    );
}

function splitTextSegments(
  text: string
): TextSegment[] {

  const segments:
    TextSegment[] = [];

  const pattern =
    /(\s*)(\S+)/g;

  let match:
    RegExpExecArray | null;

  while (
    (
      match =
        pattern.exec(
          text
        )
    )
  ) {

    segments.push({

      leadingSpaces:
        match[1]?.length ?? 0,

      text:
        match[2]!
    });
  }

  return segments;
}
