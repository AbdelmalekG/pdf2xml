import {
  Component,
  computed,
  input
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vector',
  imports: [CommonModule],
  templateUrl: './vector.html',
  styleUrl: './vector.scss',
})
export class Vector {
  readonly object =
    input.required<any>();

  readonly pageHeight =
    input.required<number>();

  readonly style =
    input.required<any>();

  readonly path = computed(() => {
    interface Segment {
      cp1x: number;
      cp1y: number;
      cp2x: number;
      cp2y: number;
      x: number;
      y: number;
    }

    interface VectorObject {
      startX: number;
      startY: number;
      x: number;
      y: number;
      segments: Segment[];
    }
    const vector = this.object();

    const typedVector = this.object() as VectorObject;

    return [

      `M ${typedVector.startX - typedVector.x} ${typedVector.startY - typedVector.y}`,

      ...typedVector.segments.map((segment: Segment) =>

        `C
      ${segment.cp1x - typedVector.x}
      ${segment.cp1y - typedVector.y}

      ${segment.cp2x - typedVector.x}
      ${segment.cp2y - typedVector.y}

      ${segment.x - typedVector.x}
      ${segment.y - typedVector.y}`

      )

    ].join(" ");

  });

  readonly highlighted =
    input(false);
}
