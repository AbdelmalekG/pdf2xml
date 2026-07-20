import { Component, inject } from '@angular/core';

import { ConverterService } from '../services/converter/converter';
import { DocumentService } from '../services/document/document';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-upload',
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})

export class Upload {

  private readonly converter =
    inject(ConverterService);

  private readonly document =
    inject(DocumentService);

  onFileSelected(
    event: Event
  ) {

    const input =
      event.target as HTMLInputElement;

    const file =
      input.files?.[0];

    if (!file) {

      return;
    }

    this.converter
      .convert(file)
      .subscribe({

        error: console.error

      });

    this.document
      .analyze(file)
      .subscribe({

        error: console.error

      });
  }
}