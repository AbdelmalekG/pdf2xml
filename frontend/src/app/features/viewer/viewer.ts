import { Component, inject } from '@angular/core';

import {
  SplitComponent,
  SplitAreaComponent
} from 'angular-split';

import { MonacoEditorModule } from 'ngx-monaco-editor-v2';

import { ConverterService } from '../services/converter/converter';

import { XmlEditor } from '../xml-editor/xml-editor';
import { DocumentViewer } from '../document-viewer/document-viewer';

import { SplitControls } from './components/split-controls/split-controls';

@Component({
  selector: 'app-viewer',
  imports: [
    SplitComponent,
    SplitAreaComponent,

    MonacoEditorModule,

    XmlEditor,
    DocumentViewer,

    SplitControls
  ],
  templateUrl: './viewer.html',
  styleUrl: './viewer.scss'
})

export class Viewer {

  leftSize = 40;

  get rightSize() {
    return 100 - this.leftSize;
  }

  readonly converter =
    inject(ConverterService);

  collapseXml() {
    this.leftSize = 0;
  }

  collapseViewer() {
    this.leftSize = 100;
  }

  resetSplit() {
    this.leftSize = 40;
  }

}