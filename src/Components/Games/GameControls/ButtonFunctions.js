import initialize from '../Fetching/InitializeGame.js';

export async function startGame(gameId) {
  const pkg = await initialize(gameId, {status: "active"})
  return pkg;
};

export function cancelGame() {

};

export function invitePlayer() {

};

export function removePlayer() {

};

export function leaveGame() {
  
};

export async function restartGame(gameId) {
  const pkg = await initialize(gameId, {turn: "red", phase: "move", round: 1})
  return pkg;
};