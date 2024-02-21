import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { HeroesLogicService } from './heroes-logic.service';
import { HeroesComponent } from './heroes.component';
import { Heroes } from '../../core/domain/entity/heroes';
import { NgxsModule, Store } from '@ngxs/store';
import { HeroesState } from '../../shared/store/heroes/heroes.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let heroesService: HeroesLogicService;
  let store: Store;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([HeroesState]), HttpClientTestingModule],
      providers: [HeroesComponent, HeroesLogicService],
    });
    component = TestBed.inject(HeroesComponent);
    heroesService = TestBed.inject(HeroesLogicService);
    store = TestBed.inject(Store);
  });

  it('should edit hero successfully', () => {
    const hero = { id: '1', nombre: 'Hero1' } as Heroes;
    jest.spyOn(heroesService, 'editHero').mockReturnValue(of(null));
    component.editHero(hero);
    expect(heroesService.editHero).toHaveBeenCalledWith(hero);
  });

  it('should handle error when editing hero fails', () => {
    const hero = { id: '1', nombre: 'Hero1' } as Heroes;
    jest.spyOn(heroesService, 'editHero').mockReturnValue(throwError('Error'));
    component.editHero(hero);
    expect(heroesService.editHero).toHaveBeenCalledWith(hero);
  });
});
