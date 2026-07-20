import {
  Component,
  computed,
  input
} from '@angular/core';

@Component({
  selector: 'app-word',
  imports: [],
  templateUrl: './word.html',
  styleUrl: './word.scss'
})

export class Word {

  readonly object =
    input.required<any>();

  readonly pageHeight =
    input.required<number>();

  readonly style =
    input.required<any>();

  readonly highlighted =
  input(false);
}