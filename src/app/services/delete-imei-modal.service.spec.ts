import { TestBed } from '@angular/core/testing';

import { DeleteImeiModalService } from './delete-imei-modal.service';

describe('DeleteImeiModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeleteImeiModalService = TestBed.get(DeleteImeiModalService);
    expect(service).toBeTruthy();
  });
});
