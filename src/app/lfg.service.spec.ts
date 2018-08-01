import { TestBed, inject } from '@angular/core/testing';

import { LfgService } from './lfg.service';

describe('LfgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LfgService]
    });
  });

  it('should ...', inject([LfgService], (service: LfgService) => {
    expect(service).toBeTruthy();
  }));
});
