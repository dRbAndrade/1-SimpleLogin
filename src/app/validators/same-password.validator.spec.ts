import { TestBed } from '@angular/core/testing';

import { NewUserValidator } from './new-user.validator';

describe('UserValidator', () => {
  let service: NewUserValidator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewUserValidator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
