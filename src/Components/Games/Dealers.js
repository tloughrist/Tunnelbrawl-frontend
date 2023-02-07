export function deal(boardState, color, isPile) { 
  const cards = boardState.filter(({loc}) => isPile(loc, color));
  return cards;
};