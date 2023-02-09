import {isHand} from "./Helpers/Checkers.js";

export default function movePiece(spaceId, clearHighlight, activePiece, game, handleClick, confirmMove, handleCapture, replaceContents, board) {
  clearHighlight();
  if ((activePiece.contents.color === game.turn) && (game.phase === "move")) {
    handleCapture(spaceId);
    const captureContents = board.find(({loc}) => loc === spaceId).contents;
    captureContents.highlight = "highlight--none";
    replaceContents(activePiece.loc, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
    replaceContents(spaceId, activePiece.contents);
    function undoMove() {
      replaceContents(spaceId, captureContents);
      replaceContents(activePiece.loc, activePiece.contents);
    };
    confirmMove(undoMove);
  } else if ((game.phase === "place") && (isHand(activePiece.loc, game.turn))) {
    replaceContents(activePiece.loc, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
    replaceContents(spaceId, activePiece.contents);
    function undoPlace() {
      replaceContents(spaceId, {type: "empty", img: <div className="empty" onClick={handleClick} ></div>, highlight: "highlight--none"});
      replaceContents(activePiece.loc, activePiece.contents);
    };
    confirmMove(undoPlace);
  } else {
    alert("Sorry, you cannot move that piece right now.");
  }
};