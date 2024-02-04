import { TestBed } from '@angular/core/testing';

import { UserValidator } from './user.validator';

describe('UserValidator', () => {
  let service: UserValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
