import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticalReaders } from './statistical-readers';

describe('StatisticalReaders', () => {
  let component: StatisticalReaders;
  let fixture: ComponentFixture<StatisticalReaders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticalReaders],
    }).compileComponents();

    fixture = TestBed.createComponent(StatisticalReaders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
