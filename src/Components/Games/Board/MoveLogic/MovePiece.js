import { clearHighlight } from './Highlights.js';
import handleCapture from './Capture.js';
import { isHand } from '../../Helpers/Checkers.js';
import submitBoard from '../../Fetching/UpdateBoard.js';
import submitGame from '../../Fetching/UpdateGame.js';

export default function movePiece(spaceId, activePiece, color, board, game, setBoard, boardId) {
  clearHighlight();
  const emptyPiece = {color: "empty", type: "empty", img: <div className={"empty"}></div>, highlight: "highlight--none"}
  if ((activePiece.contents.color === color) && (game.phase === "move")) {
    handleCapture(spaceId);
    const captureContents = board.find(({loc}) => loc === spaceId).contents;
    captureContents.highlight = "highlight--none";
    replaceContents(activePiece.loc, emptyPiece, board, setBoard);
    replaceContents(spaceId, activePiece.contents, board, setBoard);
    function undoMove() {
      replaceContents(spaceId, captureContents, board, setBoard);
      replaceContents(activePiece.loc, activePiece.contents, board, setBoard);
    };
    confirmMove(undoMove, boardId);
  } else if ((game.phase === "place") && (isHand(activePiece.loc, game.turn))) {
    replaceContents(activePiece.loc, emptyPiece, board, setBoard);
    replaceContents(spaceId, activePiece.contents, board, setBoard);
    function undoPlace() {
      replaceContents(spaceId, emptyPiece, board, setBoard);
      replaceContents(activePiece.loc, activePiece.contents, board, setBoard);
    };
    confirmMove(undoPlace, boardId);
  } else {
    alert("Sorry, you cannot move that piece right now.");
  }
};

function replaceContents(space, newContents, board, setBoard) {
  const location = board.find(({loc}) => loc === space);
  location.contents = newContents;
  const boardSans = board.filter(({loc}) => loc !== space);
  console.log(space)
  console.log([location])
  setBoard([...boardSans, location]);
};

async function confirmMove(undo, boardId) {
  if (window.confirm("Confirm move?")) {
    await submitBoard(boardId);
    await submitGame();
  } else {
    clearHighlight();
    undo();
  }
};