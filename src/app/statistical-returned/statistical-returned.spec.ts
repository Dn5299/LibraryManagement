import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalReturned } from './statistical-returned';

describe('StatisticalReturned', () => {
  let component: StatisticalReturned;
  let fixture: ComponentFixture<StatisticalReturned>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalReturned],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticalReturned);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
