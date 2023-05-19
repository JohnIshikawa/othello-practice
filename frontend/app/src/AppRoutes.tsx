import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home/Home";
import Game from "./components/game/Game";

export const PATH_HOME = "/";
export const PATH_GAME = "/game";

export const router = createBrowserRouter([
  { path: PATH_HOME, element: <Home /> },
  { path: PATH_GAME, element: <Game /> },
]);
