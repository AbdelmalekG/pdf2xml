import { TestBed } from '@angular/core/testing';

import { XmlMap } from './xml-map';

describe('XmlMap', () => {
  let service: XmlMap;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlMap);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
