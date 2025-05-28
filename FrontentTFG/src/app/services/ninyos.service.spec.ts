import { TestBed } from '@angular/core/testing';

import { NinyosService } from './ninyos.service';

describe('NinyosService', () => {
  let service: NinyosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinyosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
