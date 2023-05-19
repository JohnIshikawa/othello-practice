export class Game {
    constructor(private _id: number | undefined, private _created_at: Date) {}
  
    get id() {
      return this._id;
    }
  
    get startedAt() {
      return this._created_at;
    }
  }
  