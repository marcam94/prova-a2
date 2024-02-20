import { TestBed } from '@angular/core/testing';

import { HeroesLogicService } from './heroes-logic.service';

describe('HeroesService', () => {
  let service: HeroesLogicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroesLogicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
