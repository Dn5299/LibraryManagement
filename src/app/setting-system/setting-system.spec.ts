import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSystem } from './setting-system';

describe('SettingSystem', () => {
  let component: SettingSystem;
  let fixture: ComponentFixture<SettingSystem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSystem],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingSystem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
