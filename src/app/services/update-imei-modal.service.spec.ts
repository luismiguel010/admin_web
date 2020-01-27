import { TestBed } from '@angular/core/testing';

import { UpdateImeiModalService } from './update-imei-modal.service';

describe('UpdateImeiModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateImeiModalService = TestBed.get(UpdateImeiModalService);
    expect(service).toBeTruthy();
  });
});
