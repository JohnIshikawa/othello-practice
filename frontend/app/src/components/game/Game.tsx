import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import GameContent from "./GameContent";

export interface GameResponseBody {
  gameId: number;
}

const Game: React.FC = () => {
  return (
    <div>
      <Header />
      <GameContent />
      <Footer />
    </div>
  );
};

export default Game;
