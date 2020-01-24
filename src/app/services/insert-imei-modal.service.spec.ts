import { TestBed } from '@angular/core/testing';

import { InsertImeiModalService } from './insert-imei-modal.service';

describe('InsertImeiModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertImeiModalService = TestBed.get(InsertImeiModalService);
    expect(service).toBeTruthy();
  });
});
