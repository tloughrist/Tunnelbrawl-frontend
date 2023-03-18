import initialize from '../Fetching/InitializeGame.js';
import cancel from '../Fetching/CancelGame.js';

export async function startGame(gameId) {
  const pkg = await initialize(gameId, {status: "active"});
  return pkg;
};

export async function cancelGame(gameId) {
  const pkg = await cancel(gameId);
  return pkg;
};

export function removePlayer() {

};

export function leaveGame() {
  
};

export async function restartGame(gameId) {
  const pkg = await initialize(gameId, {turn: "red", phase: "move", round: 1})
  return pkg;
};