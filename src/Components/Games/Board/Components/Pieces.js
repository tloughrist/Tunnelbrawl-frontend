import React, { useContext, useState, useRef } from 'react';
import { isHand, isBoard } from '../../Helpers/Checkers.js';
import movePiece from '../MoveLogic/MovePiece.js';
import showMoves from '../MoveLogic/ShowMoves.js';
import { clearHighlight } from '../MoveLogic/Highlights.js';
import { BoardContext, ColorContext, GameContext, BoardIdContext, ActivePieceContext } from '../../Game.js';
import submitBoard from '../../Fetching/UpdateBoard.js';

export default function Piece({type, src, alt, setActivePiece, setGames, games}) {

  const board = useContext(BoardContext);
  const color = useContext(ColorContext);
  const game = useContext(GameContext);
  const boardId = useContext(BoardIdContext);
  const activePiece = useContext(ActivePieceContext);

  async function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.parentElement.id);
    const spaceItself = board.find(({loc}) => loc === spaceId);
    const clearBoard = clearHighlight(board);
    await submitBoard(boardId, clearBoard)
    if (spaceItself.contents.highlight === "highlight--yellow" || spaceItself.contents.highlight === "highlight--red") {
      movePiece(spaceId, activePiece, color, clearBoard, game, boardId, setGames, games);
      return;
    } else if (isHand(spaceId, color) || isBoard(spaceId)) {
      setActivePiece(spaceItself);
      const newBoard = showMoves(spaceItself, board);
      const gamesPkgHighLight = await submitBoard(boardId, newBoard);
      const gamesSansHighlight = games.filter((pkg) => pkg.game.id !== gamesPkgHighLight.game.id);
      const highlitGames = [...gamesSansHighlight, gamesPkgHighLight];
      setGames(highlitGames);
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