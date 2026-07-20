import {
  Injectable,
  signal
} from "@angular/core";

import {
  XmlObject
} from "./xml-map.types";

@Injectable({
  providedIn: "root"
})

export class XmlMapService {

  readonly objects =
    signal<XmlObject[]>([]);

  findByLine(
    line: number
  ) {
    return this.objects()
      .find(object =>
        line >= object.startLine &&
        line <= object.endLine
      );
  }

  build(xml: string) {

    const objects: XmlObject[] = [];

    const lines =
      xml.split("\n");

    let current: XmlObject | null =
      null;

    for (
      let index = 0;
      index < lines.length;
      index++
    ) {

      const line =
        lines[index].trim();

      if (line === "<object>") {

        current = {
          id: "",
          startLine: index + 1,
          endLine: index + 1
        };

        continue;
      }

      if (
        current &&
        line.startsWith("<id>")
      ) {

        current.id = line
          .replace("<id>", "")
          .replace("</id>", "");

        continue;

      }

      if (
        current &&
        line === "</object>"
      ) {

        current.endLine = index + 1;

        objects.push(current);

        current = null;
      }
    }

    this.objects.set(objects);

  }
}