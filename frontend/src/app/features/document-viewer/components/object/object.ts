import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import { Word } from '../word/word';
import { Image } from '../image/image';
import { Vector } from '../vector/vector';
import { Bounds } from "../bounds/bounds";

import { SelectionService } from '../../../services/selection/selection';

@Component({
  selector: 'app-object',
  imports: [
    Word,
    Image,
    Vector,
    Bounds
  ],
  templateUrl: './object.html',
  styleUrl: './object.scss'
})
export class Object {

  readonly object =
    input.required<any>();

  readonly pageHeight =
    input.required<number>();

  readonly style = computed(() => ({

    left: this.object().x,

    top:
      this.pageHeight()
      - this.object().y
      - this.object().height,

    width: this.object().width,

    height: this.object().height

  }));

  private readonly selection =
    inject(SelectionService);

  readonly highlighted =
    computed(() =>
      this.selection.clickedId()
      === this.object().id
    );
}