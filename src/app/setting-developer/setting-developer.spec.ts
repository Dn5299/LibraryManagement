import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingDeveloper } from './setting-developer';

describe('SettingDeveloper', () => {
  let component: SettingDeveloper;
  let fixture: ComponentFixture<SettingDeveloper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingDeveloper],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingDeveloper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
