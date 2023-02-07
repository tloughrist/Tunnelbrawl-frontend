import { convert } from '../Converters.js';
import handleClick from '../MoveLogic/HandleClick.js';

export async function startGame(gameId, setGame, setBoard) {

  const res = await fetch(`/games/initialize/${gameId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({status: "active"}),
  });
  if (res.ok) {
    const pkg = await res.json();
    setGame(pkg.game);
    setBoard(convert(pkg.board, handleClick));
  } else {
    console.log(res.errors);
  }
};

export function cancelGame() {

};

export function invitePlayer() {

};

export function removePlayer() {

};

export function leaveGame() {
  
};

export function restartGame() {
  
};