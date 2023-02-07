import {knightMoves, bishopMoves, rookMoves, queenMoves, kingMoves, pawnMoves} from "./LegalMoves.js";
import {isCamp, isHand, isBoard} from "../Checkers.js";

export default function showMoves(boardState, spaceId, clearHighlight, highlight, setActivePiece) {
  const spaceItself = boardState.find(({loc}) => loc === spaceId);
  setActivePiece(spaceItself);
  const spaceItselfContents = spaceItself.contents;
  const pieceColor = spaceItselfContents.color;
  const pieceType = spaceItselfContents.type;
  let moves = "";
  if (isHand(spaceId, pieceColor)) {
    switch(pieceColor) {
      case "red":
        calcVacancies(boardState, pieceColor)
        moves = {piece: calcVacancies(boardState, pieceColor), capture: []};
        break;
      case "green":
        calcVacancies(boardState, pieceColor)
        moves = {piece: calcVacancies(boardState, pieceColor), capture: []};
        break;
      case "blue":
        calcVacancies(boardState, pieceColor)
        moves = {piece: calcVacancies(boardState, pieceColor), capture: []};
        break;
      case "yellow":
        calcVacancies(boardState, pieceColor)
        moves = {piece: calcVacancies(boardState, pieceColor), capture: []};
        break;
      default:
        return;
    }
  } else if (isBoard(spaceId)) {
    switch(pieceType) {
      case "pawn":
        moves = pawnMoves(spaceId, boardState, pieceColor);
        break;
      case "rook":
        moves = rookMoves(spaceId, boardState, pieceColor);
        break;
      case "knight":
        moves = knightMoves(spaceId, boardState, pieceColor);
        break;
      case "bishop":
        moves = bishopMoves(spaceId, boardState, pieceColor);
        break;
      case "queen":
        moves = queenMoves(spaceId, boardState, pieceColor);
        break;
      case "king":
        moves = kingMoves(spaceId, boardState, pieceColor);
        break;
      default:
        return;
    }
  };
  clearHighlight();
  highlight(moves, spaceId);
};

function calcVacancies(board, color) {
  const camp = board.filter(({loc}) => isCamp(parseInt(loc), color));
  const vacancies = camp.filter(({contents}) => contents.type === "empty");
  const vacArr = vacancies.map((vac) => parseInt(vac.loc));
  return vacArr;
};