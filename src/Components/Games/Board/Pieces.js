import React, { useContext, useState, useRef } from 'react';
import { BoardContext, ColorContext, GameContext, BoardIdContext } from '../Game.js';
import { isHand, isBoard, isCamp } from '../Checkers.js';
import { pawnMoves, rookMoves, bishopMoves, knightMoves, queenMoves, kingMoves } from './LegalMoves.js';
import handleCapture from './Capture.js';
import submitBoard from '../Fetching/UpdateBoard.js';
import submitGame from '../Fetching/UpdateGame.js';


export default function Piece({type, src, alt, setBoard}) {

  const board = useContext(BoardContext);
  const color = useContext(ColorContext);
  const game = useContext(GameContext);
  const boardId = useContext(BoardIdContext);

  const [activePiece, _setActivePiece] = useState({});

  const activeRef = useRef(activePiece);

  function setActivePiece(data) {
    _setActivePiece(data);
    activeRef.current = data;
  };
  
  function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.parentElement.id);
    const spaceItself = board.find(({loc}) => loc === spaceId);
    if (spaceItself.contents.highlight === "highlight--yellow" || spaceItself.contents.highlight === "highlight--red") {
      movePiece(spaceId);
      return;
    } else if (spaceItself.contents.type === "empty") {
      clearHighlight();
      return;
    } else if (isHand(spaceId, color) || isBoard(spaceId)) {
      setActivePiece(spaceItself);
      showMoves();
      return;
    } else {
      return;
    }
  };

  function movePiece(spaceId) {
    clearHighlight();
    if ((activeRef.current.contents.color === color) && (game.phase === "move")) {
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

  function replaceContents(space, newContents) {
    const location = board.find(({loc}) => loc === space);
    location.contents = newContents;
    const boardSans = board.filter(({loc}) => loc !== space);
    console.log(space)
    console.log([location])
    setBoard([...boardSans, location]);
  };

  async function confirmMove(undo) {
    if (window.confirm("Confirm move?")) {
      await submitBoard(boardId);
      await submitGame();
    } else {
      clearHighlight();
      undo();
    }
  };

  function showMoves() {
    const pieceColor = activeRef.current.contents.color;
    const pieceType = activeRef.current.contents.type;
    let moves = "";
    if (isHand(activeRef.current.id, pieceColor)) {
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
    } else if (isBoard(activeRef.current.id)) {
      switch(pieceType) {
        case "pawn":
          moves = pawnMoves(activeRef.current.id, board, pieceColor);
          break;
        case "rook":
          moves = rookMoves(activeRef.current.id, board, pieceColor);
          break;
        case "knight":
          moves = knightMoves(activeRef.current.id, board, pieceColor);
          break;
        case "bishop":
          moves = bishopMoves(activeRef.current.id, board, pieceColor);
          break;
        case "queen":
          moves = queenMoves(activeRef.current.id, board, pieceColor);
          break;
        case "king":
          moves = kingMoves(activeRef.current.id, board, pieceColor);
          break;
        default:
          return;
      }
    };
    clearHighlight();
    highlight(moves);
  };

  function clearHighlight() {
    const clearBoard = board.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--none"}}
    })
    setBoard(clearBoard);
  };
  
  function highlight({piece, capture}) {
    const yellowBoard = board.filter(({loc}) => piece.includes(loc));
    const redBoard = board.filter(({loc}) => capture.includes(loc));
    const activeBoard = board.find(({loc}) => loc === activeRef.current.id);
    const yellowLit = yellowBoard.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--yellow"}}
    });
    const redLit = redBoard.map((space) => {
      return {...space, contents: {...space.contents, highlight: "highlight--red"}}
    });
    const activeLit = {...activeBoard, contents: {...activeBoard.contents, highlight: "highlight--active"}};
    const boardArrSansYellow = board.filter(({loc}) => !piece.includes(loc));
    const boardArrSansYellowRed = boardArrSansYellow.filter(({loc}) => !capture.includes(loc));
    const boardArrSansAll = boardArrSansYellowRed.filter(({loc}) => loc !== activeRef.current.id);
    setBoard([...boardArrSansAll, ...redLit, ...yellowLit, activeLit]);
  };
  
  function calcVacancies() {
    const camp = board.filter(({loc}) => isCamp(parseInt(loc), color));
    const vacancies = camp.filter(({contents}) => contents.type === "empty");
    const vacArr = vacancies.map((vac) => parseInt(vac.loc));
    return vacArr;
  };

  return (
    <div className={"piece"}>
      {
        type === "empty" ?
          <div className={type} onClick={(e) => handleClick(e)} />
        : <img className={type} src={src} alt={alt} onClick={(e) => handleClick(e)} />
      }
    </div>
  );
};