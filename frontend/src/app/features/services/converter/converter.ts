import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

import format from "xml-formatter";

@Injectable({
  providedIn: 'root'
})
export class ConverterService {

  readonly xml = signal('');

  readonly hasDocument = computed(() =>
    this.xml().trim().length > 0
  );

  constructor(
    private readonly http: HttpClient
  ) { }

  convert(
    file: File
  ): Observable<string> {

    const form =
      new FormData();

    form.append(
      'file',
      file
    );

    return this.http.post(
      'http://localhost:3000/api/convert',

      form,
      {
        responseType: 'text'
      }
    ).pipe(
      tap(xml => {

        const formatted = format(xml, {

          indentation: '  ',
          collapseContent: true,
          lineSeparator: '\n'
        });

        this.xml.set(formatted);
      })
    );
  }
}