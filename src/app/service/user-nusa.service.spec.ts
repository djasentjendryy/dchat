import { TestBed } from '@angular/core/testing';

import { UserNusaService } from './user-nusa.service';

describe('UserNusaService', () => {
  let service: UserNusaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserNusaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
