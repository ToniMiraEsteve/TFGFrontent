import { TestBed } from '@angular/core/testing';

import { ModelDialogService } from './model-dialog.service';

describe('ModelDialogService', () => {
  let service: ModelDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
