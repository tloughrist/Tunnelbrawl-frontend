import React, { useContext } from 'react';
import { isHand, isBoard } from '../../Helpers/Checkers.js';
import movePiece from '../MoveLogic/MovePiece.js';
import showMoves from '../MoveLogic/ShowMoves.js';
import { clearHighlight } from '../MoveLogic/Highlights.js';
import { BoardContext, ColorContext, GameContext, BoardIdContext, ActivePieceContext } from '../../Game.js';
import { GamesContext } from '../../Games.js';
import submitBoard from '../../Fetching/UpdateBoard.js';
import { resetGames } from '../../Helpers/Reseters.js';

export default function Piece({type, src, alt, setterBundle}) {

  const games = useContext(GamesContext);
  const board = useContext(BoardContext);
  const color = useContext(ColorContext);
  const game = useContext(GameContext);
  const boardId = useContext(BoardIdContext);
  const activePiece = useContext(ActivePieceContext);
  const setActivePiece = setterBundle.setActivePiece;
  const setGames = setterBundle.setGames;
  const stateBundle = {games: games, board: board, color: color, game: game, boardId: boardId, activePiece: activePiece};

  async function handleClick(e) {
    const spaceId = parseInt(e.target.parentElement.parentElement.id);
    const spaceItself = board.find(({loc}) => loc === spaceId);
    const clearBoard = clearHighlight(board);
    const gamePkgClear = await submitBoard(boardId, clearBoard)
    resetGames(games, setGames, gamePkgClear);
    if (spaceItself.contents.highlight === "highlight--move" || spaceItself.contents.highlight === "highlight--capture") {
      movePiece(spaceId, setterBundle, stateBundle);
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