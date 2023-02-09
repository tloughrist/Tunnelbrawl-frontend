import { isHand, isBoard, isCamp } from '../../Helpers/Checkers.js';
import { pawnMoves, rookMoves, knightMoves, bishopMoves, queenMoves, kingMoves} from './LegalMoves.js';
import { highlight } from './Highlights.js';

export default function showMoves(activePiece, board) {
  const pieceColor = activePiece.contents.color;
  const pieceType = activePiece.contents.type;
  let moves = "";
  if (isHand(activePiece.loc, pieceColor)) {
    switch(pieceColor) {
      case "red":
        calcVacancies(board, pieceColor)
        moves = {piece: calcVacancies(board, pieceColor), capture: []};
        break;
      case "green":
        calcVacancies(board, pieceColor)
        moves = {piece: calcVacancies(board, pieceColor), capture: []};
        break;
      case "blue":
        calcVacancies(board, pieceColor)
        moves = {piece: calcVacancies(board, pieceColor), capture: []};
        break;
      case "yellow":
        calcVacancies(board, pieceColor)
        moves = {piece: calcVacancies(board, pieceColor), capture: []};
        break;
      default:
        return;
    }
  } else if (isBoard(activePiece.loc)) {
    switch(pieceType) {
      case "pawn":
        moves = pawnMoves(activePiece.loc, board, pieceColor);
        break;
      case "rook":
        moves = rookMoves(activePiece.loc, board, pieceColor);
        break;
      case "knight":
        moves = knightMoves(activePiece.loc, board, pieceColor);
        break;
      case "bishop":
        moves = bishopMoves(activePiece.loc, board, pieceColor);
        break;
      case "queen":
        moves = queenMoves(activePiece.loc, board, pieceColor);
        break;
      case "king":
        moves = kingMoves(activePiece.loc, board, pieceColor);
        break;
      default:
        return;
    }
  };
  return highlight(board, activePiece, moves);
};

function calcVacancies(board, color) {
  const camp = board.filter(({loc}) => isCamp(parseInt(loc), color));
  const vacancies = camp.filter(({contents}) => contents.type === "empty");
  const vacArr = vacancies.map((vac) => parseInt(vac.loc));
  return vacArr;
};