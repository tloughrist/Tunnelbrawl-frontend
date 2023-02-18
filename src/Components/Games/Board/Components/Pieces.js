import React, { useContext, useState, useRef } from 'react';
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
    await clear();
    if (spaceItself.contents.highlight === "highlight--move" || spaceItself.contents.highlight === "highlight--capture") {
      const res = await fetch(`boards/move_piece/${boardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_loc: `loc${activePiece}`,
          end_loc: `loc${spaceId}`
        }),
      });
      if (res.ok) {
        const gamePkg = await res.json();
        const gamesSans = games.filter(game => game.game.id !== gamePkg.game.id);
        setGames([...gamesSans, gamePkg]);
      } else if (res.statusText === "Not Acceptable") {
        alert("Illegal move")
      }
      return;
    } else if (spaceItself.contents.type === "empty") {
      return;
    } else {
      setActivePiece(parseInt(e.target.parentElement.parentElement.id))
      const res = await fetch(`boards/show_moves/${boardId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            active_piece: `loc${spaceId}`
          }),
        });
      const gamePkg = await res.json();
      const gamesSans = games.filter(game => game.game.id !== gamePkg.game.id);
      setGames([...gamesSans, gamePkg]);
    }
  };

  async function clear() {
    const res = await fetch(`boards/clear_highlights/${boardId}`, {
        method: "PUT",
      });
    const gamePkg = await res.json();
    const gamesSans = games.filter(game => game.game.id !== gamePkg.game.id);
    setGames([...gamesSans, gamePkg])
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