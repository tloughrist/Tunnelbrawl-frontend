import React, { useContext, useState, useRef } from 'react';
import { isHand, isBoard } from '../../Helpers/Checkers.js';
import movePiece from '../MoveLogic/MovePiece.js';
import showMoves from '../MoveLogic/ShowMoves.js';
import { clearHighlight } from '../MoveLogic/Highlights.js';
import { BoardContext, ColorContext, GameContext, BoardIdContext, ActivePieceContext } from '../../Game.js';

export default function Piece({type, src, alt, setBoard, setActivePiece, setGames, setGame}) {

  const board = useContext(BoardContext);
  const color = useContext(ColorContext);
  const game = useContext(GameContext);
  const boardId = useContext(BoardIdContext);
  const activePiece = useContext(ActivePieceContext);

  function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.parentElement.id);
    const spaceItself = board.find(({loc}) => loc === spaceId);
    if (spaceItself.contents.highlight === "highlight--yellow" || spaceItself.contents.highlight === "highlight--red") {
      const clearBoard = clearHighlight(board);
      setBoard(clearBoard);
      movePiece(spaceId, activePiece, color, clearBoard, game, setBoard, boardId, setGames, setGame);
      return;
    } else if (spaceItself.contents.type === "empty") {
      setBoard(clearHighlight(board));
      return;
    } else if (isHand(spaceId, color) || isBoard(spaceId)) {
      setActivePiece(spaceItself);
      const clearBoard = clearHighlight(board);
      setBoard(showMoves(spaceItself, clearBoard));
      return;
    } else {
      return;
    }
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