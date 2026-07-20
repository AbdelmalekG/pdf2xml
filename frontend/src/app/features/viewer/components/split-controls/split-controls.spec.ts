import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitControls } from './split-controls';

describe('SplitControls', () => {
  let component: SplitControls;
  let fixture: ComponentFixture<SplitControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplitControls],
    }).compileComponents();

    fixture = TestBed.createComponent(SplitControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
