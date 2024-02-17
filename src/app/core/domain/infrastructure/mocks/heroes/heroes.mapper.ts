import {HeroesModel} from "./heroes-model";
import {Heroes} from "../../../entity/heroes";

export class HeroesMapper {
  static mapFrom(heroModel: HeroesModel): Heroes {
    return {
      id: heroModel.Id,
      nombre: heroModel.Name,
      alias: heroModel.Alias,
      descripcion: heroModel.Description,
      imagen_url: heroModel.srcImg,
      historia: heroModel.history,
    };
  }
}
