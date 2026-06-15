import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalTop } from './statistical-top';

describe('StatisticalTop', () => {
  let component: StatisticalTop;
  let fixture: ComponentFixture<StatisticalTop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalTop],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticalTop);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
