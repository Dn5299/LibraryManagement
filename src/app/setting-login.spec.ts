import { TestBed } from '@angular/core/testing';

import { SettingLogin } from './setting-login';

describe('SettingLogin', () => {
  let service: SettingLogin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingLogin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
