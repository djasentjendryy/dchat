import { TestBed } from '@angular/core/testing';

import { RumahSakitService } from './rumah-sakit.service';

describe('RumahSakitService', () => {
  let service: RumahSakitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RumahSakitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
