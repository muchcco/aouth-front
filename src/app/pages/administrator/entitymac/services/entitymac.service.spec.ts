import { TestBed } from '@angular/core/testing';

import { EntitymacService } from './entitymac.service';

describe('EntitymacService', () => {
  let service: EntitymacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntitymacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
