import { TestBed } from '@angular/core/testing';

import { RestproductService } from './rest-product.service';

describe('RestproductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RestproductService = TestBed.get(RestproductService);
    expect(service).toBeTruthy();
  });
});
