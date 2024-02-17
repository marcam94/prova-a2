import { HeroesModel } from './heroes-model';
import { Heroes } from '../../../entity/heroes';

export class HeroesMapper {
  static mapFrom(heroModel: HeroesModel): Heroes {
    return {
      id: heroModel.id,
      nombre: heroModel.Name,
      alias: heroModel.Alias,
      descripcion: heroModel.Description,
      imagen_url: heroModel.srcImg,
      historia: heroModel.history,
    };
  }
  static mapTo(hero: Heroes): HeroesModel {
    return {
      id: hero.id,
      Name: hero.nombre,
      Alias: hero.alias,
      Description: hero.descripcion,
      srcImg: hero.imagen_url,
      history: hero.historia,
    };
  }
}
