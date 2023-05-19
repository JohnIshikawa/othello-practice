import { Disc, isOppositeDisc } from "./disc";
import { Point } from "./point";

// 盤面
export class Board {
  private _guardedDiscs: Disc[][];

  constructor(private _discs: Disc[][]) {
    this._guardedDiscs = this.guardDiscs();
  }

  get discs() {
    return this._discs;
  }

  countDisc(disc: Disc): number {
    let count = 0;
    for (let y = 0; y < this._discs.length; y++) {
      const line = this._discs[y];

      for (let x = 0; x < line.length; x++) {
        if (this._discs[y][x] === disc) {
          count++;
        }
      }
    }

    return count;
  }

  /**
   * 駒を置く
   * 駒がおける場合、駒を置いてひっくり返した後の盤面を返す
   */
  placeDisc(disc: Disc | undefined, point: Point): Board | undefined {
    if (!disc) {
      return undefined;
    }
    // 空のマス目ではない
    if (this._discs[point.y][point.x] !== Disc.Empty) {
      return undefined;
    }

    // ひっくり返せる石をリストアップ
    const turnOverPoints = this.listTurnOverPoints(disc, point);
    if (turnOverPoints.length === 0) {
      return undefined;
    }

    // 盤面をコピーする
    const newDiscs = this._discs.map((line) => {
      return line.map((disc) => disc);
    });

    // 石を置く
    newDiscs[point.y][point.x] = disc;

    // ひっくり返す
    turnOverPoints.forEach((point) => {
      newDiscs[point.y][point.x] = disc;
    });

    return new Board(newDiscs);
  }

  /**
   * ひっくり返せる座標のリストを作成する
   */
  private listTurnOverPoints(disc: Disc, point: Point): Point[] {
    const turnOverPoints: Point[] = [];

    const guardedX = point.x + 1;
    const guardedY = point.y + 1;

    /**
     * ひっくり返せる座標の探索
     * @param directionX : 探索のx方向
     * @param directionY : 探索のy方向
     */
    const searchTurnOverPoints = (directionX: number, directionY: number) => {
      const tmpList: Point[] = [];

      // 探索を開始する座標
      let cursorX = guardedX + directionX;
      let cursorY = guardedY + directionY;

      // 逆の色の石がある間は処理続行
      while (isOppositeDisc(disc, this._guardedDiscs[cursorY][cursorX])) {
        // 番兵を考慮して座標を-1して格納する
        tmpList.push(new Point(cursorX - 1, cursorY - 1));
        cursorX += directionX;
        cursorY += directionY;
        // 次の手が同じ色の石ならひっくり返せる座標が確定する
        if (disc === this._guardedDiscs[cursorY][cursorX]) {
          turnOverPoints.push(...tmpList);
          break;
        }
      }
    };

    // 上方向
    searchTurnOverPoints(0, -1);
    // 下方向
    searchTurnOverPoints(0, +1);
    // 右方向
    searchTurnOverPoints(+1, 0);
    // 左方向
    searchTurnOverPoints(-1, 0);
    // 右上方向
    searchTurnOverPoints(+1, -1);
    // 右下方向
    searchTurnOverPoints(+1, +1);
    // 左上方向
    searchTurnOverPoints(-1, +1);
    // 左下方向
    searchTurnOverPoints(-1, -1);

    return turnOverPoints;
  }

  /**
   * ひっくり返す座標が存在するかどうか
   * @param disc
   * @returns
   */
  existTurnOverPoint(disc: Disc): boolean {
    for (let y = 0; y < this._discs.length; y++) {
      const line = this._discs[y];

      for (let x = 0; x < line.length; x++) {
        const discOnBoard = line[x];

        // 空ではない点は無視する
        if (discOnBoard !== Disc.Empty) {
          continue;
        }

        const turnOverPoints = this.listTurnOverPoints(disc, new Point(x, y));

        // ひっくり返せる点がある = 置ける場所がある
        if (turnOverPoints.length !== 0) {
          return true;
        }
      }
    }

    return false;
  }

  // 置ける座標を取得する
  getCanPlacePoints(turnDisc: Disc): Point[] {
    const canPlaceList: Point[] = [];

    for (let y = 0; y < this._discs.length; y++) {
      const line = this._discs[y];

      for (let x = 0; x < line.length; x++) {
        const discOnBoard = line[x];

        // 空ではない点は無視する
        if (discOnBoard !== Disc.Empty) {
          continue;
        }

        const point = new Point(x, y);
        const turnOverPoints = this.listTurnOverPoints(turnDisc, point);
        if (turnOverPoints.length > 0) {
          canPlaceList.push(point);
        }
      }
    }
    return canPlaceList;
  }

  count(disc: Disc): number {
    return this._discs
      .map((line) => {
        return line.filter((discOnBoard) => discOnBoard === disc).length;
      })
      .reduce((v1, v2) => v1 + v2, 0);
  }

  // 盤面を番兵で囲む
  private guardDiscs(): Disc[][] {
    const guarded: Disc[][] = [];

    const topAndBottom = Array(this._discs[0].length + 2).fill(Disc.Guard);

    guarded.push(topAndBottom);

    this._discs.forEach((line) => {
      const guardedLine = [Disc.Guard, ...line, Disc.Guard];
      guarded.push(guardedLine);
    });

    guarded.push(topAndBottom);

    return guarded;
  }
}

const E = Disc.Empty;
const D = Disc.Dark;
const L = Disc.Light;

export const INITIAL_DISCS = [
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, D, L, E, E, E],
  [E, E, E, L, D, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
  [E, E, E, E, E, E, E, E],
];
