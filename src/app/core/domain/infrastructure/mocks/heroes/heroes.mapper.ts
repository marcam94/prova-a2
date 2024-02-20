import { HeroesModel } from './heroes-model';
import { Heroes } from '../../../entity/heroes';

export class HeroesMapper {
  static mapFrom(heroModel: HeroesModel): Heroes {
    const regExpSrc = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const notFoundImgSrc = 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png';
    return {
      id: heroModel.id,
      nombre: heroModel.Name,
      alias: heroModel.Alias,
      descripcion: heroModel.Description,
      imagen_url: !heroModel.SrcImg || !regExpSrc.test(heroModel.SrcImg) ? notFoundImgSrc : heroModel.SrcImg,
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
