import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalBorrowing } from './statistical-borrowing';

describe('StatisticalBorrowing', () => {
  let component: StatisticalBorrowing;
  let fixture: ComponentFixture<StatisticalBorrowing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalBorrowing],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticalBorrowing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
