import { isHand, isDeck, isPile } from './Checkers.js';

export default function handleDraw(board, color, setBoard) {
  const hand = deal(board, color, isHand);
  console.log(hand)
  const emptyHand = hand.find((space) => space.contents.type === "empty");
  const deck = deal(board, color, isDeck);
  function draw() {
    let level = 0;
    while (level < 8) {
      if (deck[level].contents.type === "empty") {
        level += 1;
      } else {
        console.log(emptyHand)
        emptyHand.contents = deck[level].contents;
        deck[level].contents = {type: "empty"};
        break;
      }
    }
  };
  draw();
  const handSans = hand.filter(({loc}) => loc !== emptyHand.loc);
  const newHand = [...handSans, emptyHand];
  const replacements = [...newHand, ...deck]
  const boardSans = board.filter(({loc}) => {
    const replaceLocs = replacements.map((card) => card.loc);
    return !replaceLocs.includes(loc);
  });
  const newBoard = [...boardSans, ...replacements];
  setBoard(newBoard);
};

function deal(board, color, isPile) { 
  const cards = board.filter(({loc}) => isPile(loc, color));
  return cards;
};