import React from "react";

import "./css/Square.css";
import { Disc } from "../../domain/turn/disc";

const discTypeToClassName = (disc: Disc) => {
  switch (disc) {
    case Disc.Dark:
      return "dark";
    case Disc.Light:
      return "light";
    default:
      return "";
  }
};

export interface SquareProp {
  x: number;
  y: number;
  disc: Disc;
  canPlace: boolean;
  squareClicked: (x: number, y: number) => void | undefined;
}
const Square: React.FC<SquareProp> = (props: SquareProp) => {
  const { x, y, disc, canPlace, squareClicked } = props;

  return (
    <div className="square">
      <div
        className={`disc ${discTypeToClassName(disc)} ${canPlace ? "canPlace" : ""}`}
        onClick={() => squareClicked(x, y)}
      ></div>
    </div>
  );
};

export default Square;
