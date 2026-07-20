import {
  Component,
  input
} from '@angular/core';

@Component({
  selector: 'app-image',
  imports: [],
  templateUrl: './image.html',
  styleUrl: './image.scss',
})
export class Image {
  readonly object =
    input.required<any>();

  readonly pageHeight =
    input.required<number>();

  readonly highlighted =
    input(false);
}
