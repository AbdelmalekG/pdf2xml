import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bounds } from './bounds';

describe('Bounds', () => {
  let component: Bounds;
  let fixture: ComponentFixture<Bounds>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bounds],
    }).compileComponents();

    fixture = TestBed.createComponent(Bounds);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
