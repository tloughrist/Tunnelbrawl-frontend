import advance from '../Helpers/Advance.js';
import { convert } from '../Helpers/Converters.js';
import { isLocked } from '../Helpers/Checkers.js';
import handleDraw from '../Helpers/Draw.js';

export default async function submitGame(board, game, setGames, setGame, setBoard) {
  const newGameState = advance(board, game);
  const newGameStatus = calcGameStatus();
  newGameState.status = newGameStatus;
  const res = await fetch(`/games/${game.id}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newGameState),
    });
  if (res.ok) {
    const pkgs = await res.json();
    setGames(pkgs);
    const newGamePkg = pkgs.find(({game_id}) => game_id = game.id);
    const currentColor = game.turn;
    setGame(newGamePkg.game);
    setBoard(convert(newGamePkg.board));
    if (isLocked(game.turn, board)) {
      alert(`${game.turn} is locked. Turn is forfeited.`);
      submitGame();
    } else if (newGameState.phase === "move") {
      handleDraw(board, currentColor, setBoard);
    }
  } else {
    console.log(res.errors);
  }
};

function calcGameStatus() {
  //when there are x kings in graveyards...
  return "in progress";
}