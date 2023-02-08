export default function handleCapture(space, board, game) {
  const location = board.find(({loc}) => loc === space);
  const isOpponent = (location.contents.color !== game.turn);
  if (isOpponent) {
    console.log("move piece to graveyard and update boardArr state");
  }
};