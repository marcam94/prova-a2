import { HeroesModel } from './heroes-model';
import { Heroes } from '../../../entity/heroes';

export class HeroesMapper {
  static mapFrom(heroModel: HeroesModel): Heroes {
    return {
      id: heroModel.id,
      nombre: heroModel.Name,
      alias: heroModel.Alias,
      descripcion: heroModel.Description,
      imagen_url: heroModel.SrcImg,
      historia: heroModel.History,
      tags: heroModel.Tags,
    };
  }
  static mapTo(hero: Heroes): HeroesModel {
    return {
      id: hero.id,
      Name: hero.nombre,
      Alias: hero.alias,
      Description: hero.descripcion,
      SrcImg: hero.imagen_url,
      History: hero.historia,
      Tags: hero.tags,
    };
  }
}
