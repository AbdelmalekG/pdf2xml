import {
  Injectable,
  signal
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  readonly document =
    signal<any | null>(null);

  constructor(

    private readonly http: HttpClient

  ) {}

  analyze(
    file: File
  ): Observable<any> {

    const form =
      new FormData();

    form.append(
      'file',
      file
    );

    return this.http.post(

      'http://localhost:3000/api/document',

      form

    ).pipe(

      tap(document => {

        this.document.set(document);

      })
    );
  }
}