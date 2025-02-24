import { TestBed } from '@angular/core/testing';

import { CreatePdfFactureService } from './create-pdf-facture.service';

describe('CreatePdfFactureService', () => {
  let service: CreatePdfFactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePdfFactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
