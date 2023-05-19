import React, { useState } from "react";
import OthelloBoard from "../common/OthelloBoard";
import Announce from "./Announce";
import AnnounceMini from "./AnnounceSub";
import { Board, INITIAL_DISCS } from "../../domain/turn/board";
import { Disc, getOppositeDisc } from "../../domain/turn/disc";
import { Turn } from "../../domain/turn/turn";
import { getTurnText } from "../../domain/announce/announceText";
import { getSkkipedText } from "../../domain/announce/subAnnounceText";
import { Point } from "../../domain/turn/point";

interface GameState {
  turnDisc: Disc | undefined;
  discs: Disc[][];
  mainText: string;
  subText: string;
}

const GameContent: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    turnDisc: Disc.Dark,
    discs: INITIAL_DISCS,
    mainText: getTurnText(Disc.Dark),
    subText: "",
  });

  const squareClicked = async (x: number, y: number) => {
    if (!gameState.turnDisc) {
      return;
    }
    const preTurn = new Turn(gameState.turnDisc, new Board(gameState.discs));

    // 石を置く
    const newBoard = preTurn.board.placeDisc(
      gameState.turnDisc,
      new Point(x, y)
    );
    if (!newBoard) {
      return;
    }

    const nextTurn = new Turn(
      preTurn.getNextDisc(newBoard, gameState.turnDisc),
      newBoard
    );
    let mainText = "";
    let subText = "";

    // 次のディスクを取得
    if (nextTurn.gameIsEnd()) {
      // ゲーム終了
      mainText = nextTurn.getWinnerText();
    } else if (nextTurn.turnDisc === gameState.turnDisc) {
      // スキップ
      const skippedDisc = getOppositeDisc(gameState.turnDisc);
      mainText = getTurnText(nextTurn.turnDisc);
      subText = getSkkipedText(skippedDisc);
    } else {
      // 通常
      mainText = getTurnText(nextTurn.turnDisc!);
      subText = "";
    }

    setGameState({
      turnDisc: nextTurn.turnDisc,
      discs: newBoard.discs,
      mainText: mainText,
      subText: subText,
    });
  };

  return (
    <div>
      <Announce text={gameState.mainText} />
      <AnnounceMini text={gameState.subText} />
      <OthelloBoard
        turnDisc={gameState.turnDisc ? gameState.turnDisc : Disc.Empty}
        discs={gameState.discs}
        squareClickEvent={squareClicked}
      />
    </div>
  );
};

export default GameContent;
