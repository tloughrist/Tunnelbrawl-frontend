export function clearHighlight(board, setBoard) {
  const clearBoard = board.map((space) => {
    return {...space, contents: {...space.contents, highlight: "highlight--none"}}
  });
  console.log(clearBoard)
  setBoard(clearBoard);
};

export function highlight(board, activePiece, setBoard, {piece, capture}) {
  console.log(piece)
  const yellowBoard = board.filter(({loc}) => piece.includes(loc));
  const redBoard = board.filter(({loc}) => capture.includes(loc));
  const activeBoard = board.find(({loc}) => loc === activePiece.loc);
  const yellowLit = yellowBoard.map((space) => {
    return {...space, contents: {...space.contents, highlight: "highlight--yellow"}}
  });
  const redLit = redBoard.map((space) => {
    return {...space, contents: {...space.contents, highlight: "highlight--red"}}
  });
  const activeLit = {...activeBoard, contents: {...activeBoard.contents, highlight: "highlight--active"}};
  const boardArrSansYellow = board.filter(({loc}) => !piece.includes(loc));
  const boardArrSansYellowRed = boardArrSansYellow.filter(({loc}) => !capture.includes(loc));
  const boardArrSansAll = boardArrSansYellowRed.filter(({loc}) => loc !== activePiece.id);
  setBoard([...boardArrSansAll, ...redLit, ...yellowLit, activeLit]);
};