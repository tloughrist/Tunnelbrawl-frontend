export default async function submitGame(gameId, game) {
  const newGameState = game;
  const newGameStatus = calcGameStatus();
  newGameState.status = newGameStatus;
  const res = await fetch(`/games/${gameId}`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(newGameState),
    });
  if (res.ok) {
    const pkg = await res.json();
    return pkg;
  } else {
    console.log(res.errors);
  }
};

function calcGameStatus() {
  //when there are x kings in graveyards...
  return "in progress";
};

/*
if (isLocked(game.turn, board)) {
      alert(`${game.turn} is locked. Turn is forfeited.`);
      submitGame();
    } else if (newGameState.phase === "move") {
      handleDraw(board, currentColor, setBoard);
    }
*/