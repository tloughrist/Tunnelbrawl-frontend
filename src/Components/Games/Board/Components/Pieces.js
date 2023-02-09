import React, { useContext, useState, useRef } from 'react';
import { isHand, isBoard } from '../../Helpers/Checkers.js';
import movePiece from '../MoveLogic/MovePiece.js';
import showMoves from '../MoveLogic/ShowMoves.js';
import { clearHighlight } from '../MoveLogic/Highlights.js';
import { BoardContext, ColorContext, GameContext, BoardIdContext } from '../../Game.js';

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
      clearHighlight(board, setBoard);
      return;
    } else if (isHand(spaceId, color) || isBoard(spaceId)) {
      setActivePiece(spaceItself);
      clearHighlight(board, setBoard);
      showMoves(activeRef.current, board, setBoard);
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