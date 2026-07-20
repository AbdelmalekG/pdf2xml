import {
  Component,
  inject
} from '@angular/core';

import { DocumentService } from '../services/document/document';
import { ConverterService } from '../services/converter/converter';

import { Page } from './components/page/page';

@Component({
  selector: 'app-document-viewer',
  imports: [
    Page
  ],
  templateUrl: './document-viewer.html',
  styleUrl: './document-viewer.scss'
})

export class DocumentViewer {

  readonly document =
    inject(DocumentService);

  private readonly converter =
    inject(ConverterService);

  readonly hasDocument =
    this.converter.hasDocument;

}