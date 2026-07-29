import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowTable } from './borrow-table';

describe('BorrowTable', () => {
  let component: BorrowTable;
  let fixture: ComponentFixture<BorrowTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BorrowTable],
    }).compileComponents();

    fixture = TestBed.createComponent(BorrowTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
