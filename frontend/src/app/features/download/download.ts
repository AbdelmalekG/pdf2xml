import {
  Component,
  inject,
  computed
} from '@angular/core';

import { ConverterService } from '../services/converter/converter';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-download',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './download.html',
  styleUrl: './download.scss',
})
export class Download {

  private readonly converter =
    inject(ConverterService);

  readonly hasDocument =
    this.converter.hasDocument;

  download() {
    if (!this.hasDocument()) {
      return;
    }

    const blob = new Blob(

      [this.converter.xml()],

      {
        type: "application/xml"
      }

    );

    const url =
      URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;

    a.download = "report.xml";

    a.click();

    URL.revokeObjectURL(url);

  }
}
