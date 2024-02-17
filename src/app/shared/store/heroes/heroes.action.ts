
export class GetHeroes {
  static readonly type = '[Heroes] Fetch';
}

//TODO
/*export class AddUsers {
  static readonly type = '[Users] Add';
  constructor(public payload: any) { }
}*/

export class UpdateHeroes {
  static readonly type = '[Heroes] Update';
  constructor(public payload: any, public id: number, public i:number) { }
}

export class DeleteHeroes {
  static readonly type = '[Heroes] Delete';
  constructor(public id: number) { }
}
