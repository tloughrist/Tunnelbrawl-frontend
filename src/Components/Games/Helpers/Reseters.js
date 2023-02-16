export function resetGames(games, setGames, newGamePkg) {
  const newGameId = newGamePkg['game']['id'];
  const gamesSans = games.filter((pkg) => pkg.game.id !== newGameId);
  const newGames = [...gamesSans, newGamePkg];
  setGames(newGames);
};