import handleCapture from './Capture.js';
import { isHand, isLocked } from '../../Helpers/Checkers.js';
import advance from '../../Helpers/Advance.js';
import submitBoard from '../../Fetching/UpdateBoard.js';
import submitGame from '../../Fetching/UpdateGame.js';

export default function movePiece(spaceId, activePiece, color, board, game, boardId, setGames, games) {
  const emptyPiece = {color: "empty", type: "empty", img: <div className={"empty"}></div>, highlight: "highlight--none", acro: "em"}
  if ((activePiece.contents.color === color) && (game.phase === "move")) {
    handleCapture(spaceId, board, game);
    const captureContents = board.find(({loc}) => loc === spaceId).contents;
    captureContents.highlight = "highlight--none";
    replaceContents(activePiece.loc, emptyPiece, board, games, setGames, boardId);
    replaceContents(spaceId, activePiece.contents, board, games, setGames, boardId);
    function undoMove() {
      replaceContents(spaceId, captureContents, board, games, setGames, boardId);
      replaceContents(activePiece.loc, activePiece.contents, board, games, setGames, boardId);
    };
    confirmMove(undoMove, board, setGames, game, games);
  } else if ((game.phase === "place") && (isHand(activePiece.loc, game.turn))) {
    replaceContents(activePiece.loc, emptyPiece, board, games, setGames, boardId);
    replaceContents(spaceId, activePiece.contents, board, games, setGames, boardId);
    function undoPlace() {
      replaceContents(spaceId, emptyPiece, board, games, setGames, boardId);
      replaceContents(activePiece.loc, activePiece.contents, board, games, setGames, boardId);
    };
    confirmMove(undoPlace, board, setGames, game, games);
  } else {
    alert("Sorry, you cannot move that piece right now.");
  }
};

async function replaceContents(space, newContents, board, games, setGames, boardId) {
  const location = board.find(({loc}) => loc === space);
  location.contents = newContents;
  const boardSans = board.filter(({loc}) => loc !== space);
  const newBoard = ([...boardSans, location]);
  const gamePkg = await submitBoard(boardId, newBoard);
  const gamesSans = games.filter((pkg) => pkg.game.id !== gamePkg.game.id);
  const newGames = [...gamesSans, gamePkg];
  setGames(newGames);
};

async function confirmMove(undo, board, setGames, game, games) {
  console.log(board)
  if (window.confirm("Confirm move?")) {
    async function updateGameState() {
      const newGameState = advance(board, game);
      console.log(newGameState)
      const gamePkg = await submitGame(game.id, newGameState);
      const gamesSans = games.filter((pkg) => pkg.game.id !== gamePkg.game.id);
      const newGames = [...gamesSans, gamePkg];
      setGames(newGames);
      return gamePkg;
    }
    const updatedGamePkg = await updateGameState();
    if (isLocked(updatedGamePkg.game, board)) {
      updateGameState();
    }
  } else {
    undo();
  }
};