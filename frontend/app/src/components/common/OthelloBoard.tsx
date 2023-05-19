import React from "react";
import "./css/OthelloBoard.css";
import Square, { SquareProp } from "./Square";
import { Disc } from "../../domain/turn/disc";
import { Board } from "../../domain/turn/board";
import { Point } from "../../domain/turn/point";

interface BoardProp {
  turnDisc: Disc;
  discs: Disc[][];
  squareClickEvent: (x: number, y: number) => void;
}

const discsToProps = (discs: Disc[][], canPlacePoints: Point[], squareClickEvent: (x: number, y: number) => void): SquareProp[] => {
  const propList: SquareProp[] = [];
  discs.forEach((line: Disc[], y: number) => {
    line.forEach((disc: Disc, x: number) => {
      const point = canPlacePoints.filter(p => p.x === x && p.y === y);
      propList.push(
        {
          x: x,
          y: y,
          disc: disc,
          canPlace: point.length !== 0,
          squareClicked: squareClickEvent
        }
      );
    })
  })
  return propList;
}

const OthelloBoard: React.FC<BoardProp> = (props: BoardProp) => {
  const { turnDisc, discs, squareClickEvent } = props;
  const board = new Board(discs);
  const canPlacePoints = board.getCanPlacePoints(turnDisc);
  const squarePropList: SquareProp[] = discsToProps(discs, canPlacePoints, squareClickEvent);

  return (
    <div id="board" className="board">
      {squarePropList.map((prop: SquareProp) => <Square {...prop} key={`${prop.x}${prop.y}`} />)}
    </div>
  );
};

export default OthelloBoard;
