import { TestBed } from '@angular/core/testing';

import { Kavaludhala } from './kavaludhala.service';

describe('Kavaludhala', () => {
  let service: Kavaludhala;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Kavaludhala);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
