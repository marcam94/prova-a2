import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Heroes } from '../../../entity/heroes';
import { HeroesService } from './heroes.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all heroes', () => {
    const dummyHeroes = [
      { id: '1', nombre: 'Hero 1' },
      { id: '2', nombre: 'Hero 2' },
    ] as Heroes[];

    service.getAllHeroes().subscribe(heroes => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(dummyHeroes);
    });

    const req = httpMock.expectOne('http://localhost:3000/Heroes');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('should retrieve a hero by id', () => {
    const dummyHero = { id: '1', nombre: 'Hero 1' } as Heroes;

    service.getById('1').subscribe(hero => {
      expect(hero).toEqual(dummyHero);
    });

    const req = httpMock.expectOne('http://localhost:3000/Heroes/1');
    expect(req.request.method).toBe('GET');
    req.flush(dummyHero);
  });

  it('should create a new hero', () => {
    const dummyHero = { id: '3', nombre: 'Hero 3' } as Heroes;

    service.post(dummyHero).subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/Heroes');
    expect(req.request.method).toBe('POST');
    req.flush(dummyHero);
  });

  it('should update a hero', () => {
    const dummyHero = { id: '1', nombre: 'Updated Hero' } as Heroes;

    service.put(dummyHero, '1').subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/Heroes/1');
    expect(req.request.method).toBe('PUT');
    req.flush(dummyHero);
  });

  it('should delete a hero', () => {
    service.delete('1').subscribe(result => {
      expect(result).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:3000/Heroes/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should handle error', () => {
    service.getAllHeroes().subscribe(
      () => fail('should have failed with 500 error'),
      error => {
        expect(error).toContain('500');
      }
    );

    const req = httpMock.expectOne('http://localhost:3000/Heroes');
    req.flush('500 error', { status: 500, statusText: 'Server Error' });
  });
});
