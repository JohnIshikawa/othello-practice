import { GameWinner } from "../game/gameWinner";
import { Board } from "./board";
import { Disc, discToText } from "./disc";

export class Turn {
  constructor(
    private _turnDisc: Disc | undefined,
    private _board: Board
  ) {}

  get turnDisc() {
    return this._turnDisc;
  }

  get board() {
    return this._board;
  }

  public getNextDisc(board: Board, preDisc: Disc): Disc | undefined {
    const existDarkPoint = board.existTurnOverPoint(Disc.Dark);
    const existLightPoint = board.existTurnOverPoint(Disc.Light);

    if (existDarkPoint && existLightPoint) {
      // 両方置ける場合は、前のと反対の石
      return preDisc === Disc.Dark ? Disc.Light : Disc.Dark;
    } else if (!existDarkPoint && !existLightPoint) {
      // 両方置けない = 次の石ない = 決着
      return undefined;
    } else if (existDarkPoint) {
      // 片方しか置けない場合は。置ける方の石の番
      return Disc.Dark;
    } else {
      return Disc.Light;
    }
  }

  public gameIsEnd(): boolean {
    return this._turnDisc === undefined;
  }

  public getWinnerText(): string {
    const darkCount = this._board.countDisc(Disc.Dark);
    const lightCount = this._board.countDisc(Disc.Light);
    const winnerDisc = this.getGameWinnerDisc();
    if (winnerDisc === GameWinner.Draw) {
      return `黒:${darkCount} 対 白:${lightCount} で同点です`;
    } else {
      return `黒:${darkCount} 対 白:${lightCount} で ${discToText(winnerDisc)} の勝ちです`;
    }
  }

  private getGameWinnerDisc(): GameWinner {
    const darkCount = this._board.countDisc(Disc.Dark);
    const lightCount = this._board.countDisc(Disc.Light);

    if (darkCount > lightCount) {
      return GameWinner.Dark;
    } else if (lightCount > darkCount) {
      return GameWinner.Light;
    } else {
      return GameWinner.Draw;
    }
  }
}
