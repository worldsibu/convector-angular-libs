import { TestBed } from '@angular/core/testing';

import { ConvectorRestApiAngularAdapterService } from './convector-rest-api-angular-adapter.service';

describe('ConvectorRestApiAngularAdapterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConvectorRestApiAngularAdapterService = TestBed.get(ConvectorRestApiAngularAdapterService);
    expect(service).toBeTruthy();
  });
});
