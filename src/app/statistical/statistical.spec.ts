import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statistical } from './statistical';

describe('Statistical', () => {
  let component: Statistical;
  let fixture: ComponentFixture<Statistical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statistical],
    }).compileComponents();

    fixture = TestBed.createComponent(Statistical);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
