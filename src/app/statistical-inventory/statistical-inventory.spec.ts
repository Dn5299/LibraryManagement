import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalInventory } from './statistical-inventory';

describe('StatisticalInventory', () => {
  let component: StatisticalInventory;
  let fixture: ComponentFixture<StatisticalInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalInventory],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticalInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
