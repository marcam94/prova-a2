export class GetHeroes {
  static readonly type = '[Heroes] Fetch';
}
export class GetHeroById{
  static readonly type = '[Heroes] FetchById';
  constructor(public id: string) {}
}

export class AddHero {
  static readonly type = '[Heroes] Add';

  constructor(public payload: any) {}
}

export class UpdateHeroes {
  static readonly type = '[Heroes] Update';

  constructor(
    public payload: any,
    public id: string,
    public i: number
  ) {}
}

export class DeleteHeroes {
  static readonly type = '[Heroes] Delete';

  constructor(public id: string) {}
}
