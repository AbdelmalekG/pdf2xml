import {
  Component,
  computed,
  input
} from '@angular/core';

import { Object } from '../object/object';

import { flattenObjects } from '../../utils/document-viewer.utils';

@Component({
  selector: 'app-page',
  imports: [
    Object
  ],
  templateUrl: './page.html',
  styleUrl: './page.scss'
})

export class Page {

  readonly page =
    input.required<any>();

  readonly objects = computed(() =>

    flattenObjects(this.page().content)

  );

}