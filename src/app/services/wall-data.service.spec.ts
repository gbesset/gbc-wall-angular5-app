import { TestBed, inject } from '@angular/core/testing';

import { WallDataService } from './wall-data.service';

describe('WallDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WallDataService]
    });
  });

  it('should be created', inject([WallDataService], (service: WallDataService) => {
    expect(service).toBeTruthy();
  }));
});
