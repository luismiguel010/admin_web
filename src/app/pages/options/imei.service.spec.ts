import { TestBed } from '@angular/core/testing';

import { ImeiService } from './imei.service';

describe('ImeiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImeiService = TestBed.get(ImeiService);
    expect(service).toBeTruthy();
  });
});
