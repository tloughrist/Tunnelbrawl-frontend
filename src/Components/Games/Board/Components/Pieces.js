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

  function resetGames(games, setGames, newGamePkg) {
    const newGameId = newGamePkg['game']['id'];
    const gamesSans = games.filter((pkg) => pkg.game.id !== newGameId);
    const newGames = [...gamesSans, newGamePkg];
    setGames(newGames);
  };

  async function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.parentElement.id);
    const spaceItself = board.find(({loc}) => loc === spaceId);
    const clearBoard = clearHighlight(board);
    const gamePkgClear = await submitBoard(boardId, clearBoard)
    resetGames(games, setGames, gamePkgClear);
    if (spaceItself.contents.highlight === "highlight--yellow" || spaceItself.contents.highlight === "highlight--red") {
      movePiece(spaceId, activePiece, color, clearBoard, game, boardId, setGames, games);
      return;
    } else if (spaceItself.contents.type === "empty") {
      return;
    } else if (isHand(spaceId, color) || isBoard(spaceId)) {
      setActivePiece(spaceItself);
      const newBoard = showMoves(spaceItself, board);
      const gamesPkgHighLight = await submitBoard(boardId, newBoard);
      resetGames(games, setGames, gamesPkgHighLight);
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