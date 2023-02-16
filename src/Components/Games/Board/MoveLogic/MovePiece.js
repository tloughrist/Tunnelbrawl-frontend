import handleCapture from './Capture.js';
import { isLocked } from '../../Helpers/Checkers.js';
import advance from '../../Helpers/Advance.js';
import submitBoard from '../../Fetching/UpdateBoard.js';
import submitGame from '../../Fetching/UpdateGame.js';
import Piece from '../Components/Pieces.js';
import { resetGames } from '../../Helpers/Reseters.js';
import { clearHighlight } from './Highlights.js';

export default async function movePiece(spaceId, setterBundle, stateBundle) {

  const activePiece = stateBundle.activePiece;
  const board = stateBundle.board;
  const game = stateBundle.game;
  const boardId = stateBundle.boardId;
  const games = stateBundle.games;
  const color = stateBundle.color;
  const setGames = setterBundle.setGames;

  console.log(activePiece)

  if (activePiece.contents.color === color) {
    const emptyPiece = {color: "empty", type: "empty", img: <Piece type={"empty"} setterBundle={setterBundle} />, acro: "em"};
    const captureContents = board.find(({loc}) => loc === spaceId).contents;
    handleCapture(spaceId, board, game);
    captureContents.highlight = "highlight--none";
    const newGamePkg = await replaceContents(activePiece.loc, emptyPiece, spaceId, activePiece.contents, board, boardId);
    resetGames(games, setGames, newGamePkg);
    async function undoMove() {
      const oldGamePkg = await replaceContents(activePiece.loc, activePiece.contents, spaceId, captureContents, board, boardId);
      resetGames(games, setGames, oldGamePkg);
    };
    confirmMove(board, game, undoMove, games, setGames, boardId);
  } else {
    alert("Sorry, you cannot move that piece right now.");
  }
};

async function confirmMove(board, game, undoMove, games, setGames, boardId) {
  if (window.confirm("Confirm move?")) {
    async function updateGameState() {
      const newGameState = advance(board, game);
      const gamePkg = await submitGame(game.id, newGameState);
      resetGames(games, setGames, gamePkg);
      return gamePkg;
    }
    const updatedGamePkg = await updateGameState();
    if (isLocked(updatedGamePkg.game, board)) {
      updateGameState();
    }
  } else {
    undoMove();
  }
  const clearBoard = clearHighlight(board);
  const gamePkgClear = await submitBoard(boardId, clearBoard);
  resetGames(games, setGames, gamePkgClear);
};

async function replaceContents(space1, newContents1, space2, newContents2, board,boardId) {
  const location1 = board.find(({loc}) => loc === space1);
  location1.contents = newContents1;
  const boardSans1 = board.filter(({loc}) => loc !== space1);
  const location2 = board.find(({loc}) => loc === space2);
  location2.contents = newContents2;
  const boardSansBoth = boardSans1.filter(({loc}) => loc !== space2);
  const newBoard = ([...boardSansBoth, location1, location2]);
  const gamePkg = await submitBoard(boardId, newBoard);
  return gamePkg;
};