import {
  Component,
  computed,
  effect,
  inject
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { EditorComponent } from 'ngx-monaco-editor-v2';
import type { editor } from 'monaco-editor';

import { ConverterService } from '../services/converter/converter';
import { XmlMapService } from '../services/xml-map/xml-map';
import { SelectionService } from '../services/selection/selection';

@Component({
  selector: 'app-xml-editor',
  imports: [
    FormsModule,
    EditorComponent
  ],
  templateUrl: './xml-editor.html',
  styleUrl: './xml-editor.scss'
})

export class XmlEditor {

  private readonly converter =
    inject(ConverterService);

  readonly hasDocument =
    this.converter.hasDocument;

  readonly editorContent = computed(() => {

    if (this.converter.hasDocument()) {

      return this.converter.xml();

    }

    return `<!--
  Upload a document.

  The generated XML will appear here.

  Click an <object> tag to highlight
  its corresponding object inside the
  Document Viewer.

  Once satisfied, download the XML.
-->`;
  });

  readonly options = {
    language: 'xml',
    readOnly: true,
    automaticLayout: true,
    minimap: {
      enabled: false
    },
    scrollBeyondLastLine: false
  };

  private editor?:
    editor.IStandaloneCodeEditor;

  private readonly xmlMap =
    inject(XmlMapService);

  private readonly selection =
    inject(SelectionService);

  onEditorInit(
    editor: editor.IStandaloneCodeEditor
  ) {
    this.editor = editor;

    editor.onDidChangeCursorPosition(event => {
      const line = event.position.lineNumber;

      const object = this.xmlMap.findByLine(line);

      this.selection.clickedId.set(
        object?.id ?? null
      );
    });
  }

  constructor() {
    effect(() => {
      const content = this.editorContent();

      if (this.converter.hasDocument()) {
        this.xmlMap.build(content);
      }
    });
  }
}