import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalOverview } from './statistical-overview';

describe('StatisticalOverview', () => {
  let component: StatisticalOverview;
  let fixture: ComponentFixture<StatisticalOverview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalOverview],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticalOverview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
