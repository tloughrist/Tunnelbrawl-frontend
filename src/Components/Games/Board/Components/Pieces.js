import React, { useContext } from 'react';
import swal from '@sweetalert/with-react';
import { BoardContext, BoardIdContext, ActivePieceContext, GameContext, ColorContext } from '../../Game.js';
import { GamesContext } from '../../Games.js';

export default function Piece({type, src, alt, setterBundle}) {

  const games = useContext(GamesContext);
  const board = useContext(BoardContext);
  const boardId = useContext(BoardIdContext);
  const activePiece = useContext(ActivePieceContext);
  const game = useContext(GameContext);
  const color = useContext(ColorContext);
  const setActivePiece = setterBundle.setActivePiece;
  const setGames = setterBundle.setGames;

  async function handleClick(e) {
    if (game.turn === color) {
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
    } else {
      swal("Sorry, it's not your turn.");
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